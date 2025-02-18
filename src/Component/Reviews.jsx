import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth"; // استيراد getAuth للحصول على المستخدم المسجل

const FIREBASE_URL =
  "https://rent-app-a210b-default-rtdb.firebaseio.com/comments";

function Reviews({ productId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [rating, setRating] = useState(0);

  // الحصول على المستخدم المسجل
  const auth = getAuth();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === "" || !user) return; // تأكد من أن المستخدم مسجل دخول

    const newComment = {
      author: user.displayName || user.email, // استخدام اسم المستخدم أو البريد الإلكتروني
      text: comment,
      timestamp: new Date().toISOString(),
      deleted: false,
      rating: rating,
      productId: productId, // إضافة productId
    };

    try {
      // نشر التعليق مع اسم المستخدم
      await axios.post(`${FIREBASE_URL}.json`, newComment);
      setComment(""); // تفريغ الحقل
      setRating(0); // إعادة تعيين التقييم
      getItems(); // تحديث التعليقات
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const getItems = async () => {
    try {
      const response = await axios.get(`${FIREBASE_URL}.json`);
      if (response.data) {
        const fetchedComments = Object.keys(response.data)
          .map((key) => ({
            id: key,
            ...response.data[key],
          }))
          .filter(
            (comment) => !comment.deleted && comment.productId === productId
          ); // تصفية التعليقات بناءً على productId
        setComments(fetchedComments);
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    getItems();
  }, [productId]); // تحديث التعليقات عند تغيير productId

  const deleteComment = async (id) => {
    try {
      await axios.patch(`${FIREBASE_URL}/${id}.json`, { deleted: true });
      getItems(); // تحديث التعليقات
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const updateComment = async (id, newComment, newRating) => {
    try {
      await axios.patch(`${FIREBASE_URL}/${id}.json`, {
        text: newComment,
        rating: newRating,
      });
      getItems(); // تحديث التعليقات
      setEditCommentId(null); // إغلاق وضع التحرير
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
    <section className="bg-white py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-orange-500">
            Discussion ({comments.length})
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={6}
              className="px-0 w-full text-sm text-orange-500 border-0 focus:ring-0 focus:outline-none placeholder-orange-400"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center mb-4">
            <span className="mr-2 text-orange-500">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`mx-1 text-2xl ${
                  star <= rating ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-orange-500 rounded-lg focus:ring-4 focus:ring-orange-200 hover:bg-orange-600"
          >
            Post comment
          </button>
        </form>

        {comments.map((item) => (
          <article
            key={item.id}
            className="p-4 bg-white rounded-lg shadow-md mb-4"
          >
            <div className="flex items-center mt-1">
              <span className="text-orange-500 text-sm">Rating: </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`mx-1 text-lg ${
                    star <= item.rating ? "text-yellow-500" : "text-gray-400"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="text-sm font-semibold text-orange-500">
              {item.author}
            </p>

            {editCommentId === item.id ? (
              <input
                type="text"
                className="border p-1 w-full text-orange-500"
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
              />
            ) : (
              <p className="text-orange-500">{item.text}</p>
            )}

            <p className="text-xs text-orange-500">
              {new Date(item.timestamp).toLocaleString()}
            </p>

            <button
              onClick={() => deleteComment(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md ml-2"
            >
              Delete
            </button>

            {editCommentId === item.id ? (
              <button
                onClick={() => updateComment(item.id, updatedText, rating)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md ml-2"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditCommentId(item.id);
                  setUpdatedText(item.text);
                }}
                className="bg-green-500 text-white px-3 py-1 rounded-md ml-2"
              >
                Update
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
