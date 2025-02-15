import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  approvePost,
  deletePost,
} from "../redux/actions/postActions";
import Swal from "sweetalert2";
import axios from "axios";

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
          .patch(`${firebaseUrl}/${firebaseKey}.json`, { approve: true })
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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Available Apartments
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts
          .filter((post) => !rejectedPosts.has(post.firebaseKey))
          .map((post) => (
            <div
              key={post.firebaseKey}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg rounded-lg p-6"
            >
              <div className="relative mb-4">
                <div className="flex space-x-2">
                  <img
                    src={post.images || "https://via.placeholder.com/150"}
                    alt={post.name || "Post Image"}
                    className="w-1/2 h-40 object-cover rounded-lg"
                  />
                  <img
                    src={post.thumbnail || "https://via.placeholder.com/150"}
                    alt={post.name || "Post Image"}
                    className="w-1/2 h-40 object-cover rounded-lg"
                  />
                </div>
                <a
                  href={post.thumbnail}
                  download={`image-${post.name || "download"}.jpg`}
                  className="absolute bottom-1 right-1 bg-blue-500 text-white px-1 py-1 rounded-md text-sm"
                >
                  ⬇ Download
                </a>
              </div>

              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  <strong>Name: </strong>
                  {post.name || "No Name"}
                </h3>
                <p>
                  <strong className="text-red-500">Description: </strong>
                  {post.description || "No Description"}
                </p>
                <p>
                  <strong className="text-blue-500">Location:</strong>{" "}
                  {post.location || "N/A"}
                </p>
                <p>
                  <strong className="text-green-500">Price:</strong>{" "}
                  {post.price || "N/A"} JD / Night
                </p>
              </div>

              {!approvedPosts[post.firebaseKey] && (
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleApprove(post.firebaseKey)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(post.firebaseKey)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}

              {rejectReason[post.firebaseKey] !== undefined && (
                <div className="mt-2">
                  <textarea
                    value={rejectReason[post.firebaseKey]}
                    onChange={(e) => handleRejectChange(post.firebaseKey, e)}
                    placeholder="Please enter the reason for rejection"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => handleSubmitReject(post.firebaseKey)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 mt-2 rounded-md transition-colors"
                  >
                    Submit Reason
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>

      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostList;
