import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../redux/actions/messagesAction";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 ">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Messages</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white border border-gray-200 shadow-md rounded-lg p-6 hover:shadow-lg transition-all"
          >
            <div className="space-y-4">
              {/* عنوان البريد الإلكتروني */}
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Email:</span> {contact.email}
                </p>
              </div>

              {/* موضوع الرسالة */}
              <div>
                <p className="text-xl font-semibold text-gray-900">
                  {contact.subject || "No Subject"}
                </p>
              </div>

              {/* نص الرسالة */}
              <div>
                <p className="text-sm text-gray-700">
                  {contact.message || "No Message"}
                </p>
              </div>

              {/* تاريخ الرسالة (إذا كان متاحًا) */}
              {contact.timestamp && (
                <div>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(contact.timestamp).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
