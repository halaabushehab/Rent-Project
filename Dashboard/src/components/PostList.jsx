import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  approvePost,
  deletePost,
} from "../redux/actions/postActions";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "react-modal";
import '../components/Postlist.css'
import { Link } from "react-router-dom";
// تأكد من تعيين العنصر الجذر لتنسيق الـ Modal
Modal.setAppElement("#root");

const firebaseUrl =
  "https://rent-app-a210b-default-rtdb.firebaseio.com/student_housing";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const [rejectReason, setRejectReason] = useState({});
  const [rejectedPosts, setRejectedPosts] = useState(new Set());
  const [approvedPosts, setApprovedPosts] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
const [filterBy, setFilterBy] = useState("name");

  useEffect(() => {
    dispatch(fetchPosts());

    // استرجاع المنشورات المرفوضة من localStorage
    const rejected = JSON.parse(localStorage.getItem("rejectedPosts")) || [];
    setRejectedPosts(new Set(rejected));

    // جلب بيانات الموافقة من Firebase
    axios
      .get(`${firebaseUrl}.json`)
      .then((response) => {
        const fetchedApproved = {};
        Object.keys(response.data || {}).forEach((firebaseKey) => {
          fetchedApproved[firebaseKey] = response.data[firebaseKey].approve;
        });
        setApprovedPosts(fetchedApproved);
      })
      .catch((error) => console.error("Error fetching approvals:", error));
  }, [dispatch]);

  const handleDeletePost = (firebaseKey, postTitle) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete \"${postTitle}\".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(firebaseKey));
        Swal.fire("Deleted!", `\"${postTitle}\" has been deleted.`, "success");
      }
    });
  };

  const handleApprove = (firebaseKey) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to approve this post.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`${firebaseUrl}/${firebaseKey}.json`, {
            approve: true,
            role: "owner", // Ensure role is set to "owner"
          })
          .then(() => {
            setApprovedPosts((prev) => ({ ...prev, [firebaseKey]: true }));
            Swal.fire("Approved!", "The post has been approved.", "success");
          })
          .catch((error) => console.error("Error approving post:", error));
      }
    });
  };

  const handleReject = (firebaseKey) => {
    setRejectReason((prev) => ({ ...prev, [firebaseKey]: "" }));
  };

  const handleRejectChange = (firebaseKey, e) => {
    setRejectReason((prev) => ({
      ...prev,
      [firebaseKey]: e.target.value,
    }));
  };

  const handleSubmitReject = (firebaseKey) => {
    const reason = rejectReason[firebaseKey];
    if (reason) {
      axios
        .post(
          "https://rent-app-a210b-default-rtdb.firebaseio.com/rejections.json",
          {
            firebaseKey: firebaseKey,
            reason: reason,
            timestamp: new Date().toISOString(),
          }
        )
        .then(() => {
          setRejectedPosts((prev) => {
            const updatedRejectedPosts = new Set(prev);
            updatedRejectedPosts.add(firebaseKey);
            localStorage.setItem(
              "rejectedPosts",
              JSON.stringify([...updatedRejectedPosts])
            );
            return updatedRejectedPosts;
          });

          Swal.fire("Rejected!", "The post has been rejected.", "success");
        })
        .catch((error) =>
          console.error("Error submitting rejection reason:", error)
        );
    } else {
      Swal.fire("Error", "Please provide a rejection reason.", "error");
    }
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

const filteredPosts = currentPosts.filter((post) => {
  const valueToSearch = post[filterBy]?.toString().toLowerCase() || "";
  return valueToSearch.includes(searchQuery.toLowerCase());
});

return (
  <div className="p-4 max-w-6xl mx-auto bg-white text-gray-900">
    <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-2">
      Properties
    </h2>

    {/* Search and Filter */}
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md bg-gray-50"
        />
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="p-2 border rounded-md bg-gray-50"
        >
          <option value="name">Name</option>
          <option value="location">Location</option>
          <option value="price">Price</option>
        </select>
      </div>

      <Link
        to="/AddPost"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors shadow-md ml-auto"
      >
        Add new property
      </Link>
    </div>

    {/* Posts List */}
    <div className="space-y-4">
      {filteredPosts
        .filter((post) => !rejectedPosts.has(post.firebaseKey))
        .map((post) => (
          <div
            key={post.firebaseKey}
            className="bg-gray-100 border border-gray-300 shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openModal(post)}
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {post.name || "No Name"}
            </h3>
            <p className="text-sm text-gray-600">{post.location || "N/A"}</p>
            <p className="text-sm text-gray-600">
              {post.price ? `${post.price} JD / Night` : "N/A"}
            </p>
          </div>
        ))}
    </div>

    {/* Pagination */}
    <div className="mt-6 flex justify-center space-x-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          className={`px-3 py-1 rounded-md shadow-md ${
            currentPage === index + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>

    {/* Popup (Modal) */}
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Apartment Details"
      className="modal"
      overlayClassName="overlay"
    >
      {selectedPost && (
        <div className="bg-white p-6 rounded-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {selectedPost.name || "No Name"}
          </h2>

          <div className="relative mb-4">
            <div className="flex space-x-2">
              <img
                src={selectedPost.images || "https://via.placeholder.com/150"}
                alt={selectedPost.name || "Post Image"}
                className="w-1/2 h-40 object-cover rounded-lg border"
              />
              <img
                src={
                  selectedPost.thumbnail || "https://via.placeholder.com/150"
                }
                alt={selectedPost.name || "Post Image"}
                className="w-1/2 h-40 object-cover rounded-lg border"
              />
            </div>
            <a
              href={selectedPost.thumbnail}
              download={`image-${selectedPost.name || "download"}.jpg`}
              className="absolute bottom-1 right-1 bg-blue-600 text-white px-2 py-1 rounded-md text-sm shadow-md"
            >
              ⬇ Download
            </a>
          </div>

          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong className="text-red-600">Description: </strong>
              {selectedPost.description || "No Description"}
            </p>
            <p>
              <strong className="text-blue-600">Location:</strong>{" "}
              {selectedPost.location || "N/A"}
            </p>
            <p>
              <strong className="text-green-600">Price:</strong>{" "}
              {selectedPost.price || "N/A"} JD / Night
            </p>
          </div>

          {!approvedPosts[selectedPost.firebaseKey] && (
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => {
                  handleApprove(selectedPost.firebaseKey);
                  closeModal();
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors shadow-md"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(selectedPost.firebaseKey)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors shadow-md"
              >
                Reject
              </button>
            </div>
          )}

          {rejectReason[selectedPost.firebaseKey] !== undefined && (
            <div className="mt-2">
              <textarea
                value={rejectReason[selectedPost.firebaseKey]}
                onChange={(e) =>
                  handleRejectChange(selectedPost.firebaseKey, e)
                }
                placeholder="Please enter the reason for rejection"
                className="w-full p-2 border rounded-md bg-gray-50 text-gray-900"
              />
              <button
                onClick={() => {
                  handleSubmitReject(selectedPost.firebaseKey);
                  closeModal();
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 mt-2 rounded-md transition-colors shadow-md"
              >
                Submit Reason
              </button>
            </div>
          )}

          <button
            onClick={closeModal}
            className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors shadow-md"
          >
            Close
          </button>
        </div>
      )}
    </Modal>
  </div>
);
};

export default PostList;
