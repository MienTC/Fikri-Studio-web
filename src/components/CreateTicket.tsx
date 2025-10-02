import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CreateTicketProps {
  handleClose: () => void;
}

const priorities: ("Low" | "Medium" | "High")[] = ["Low", "Medium", "High"];
const ticketTypes = ["Incident", "Question", "Suggestion", "Problem"];
const requesters = ["Nguyen Van A", "Ngo Van B", "Hoang Thi C"];
const assignees = ["Fikri Studio", "Support Team", "Dev Team"];
const allTags = ["Support", "Order", "Payment", "Technical", "Feedback", "Bug", "Feature"];

const CreateTicket: React.FC<CreateTicketProps> = ({ handleClose }) => {
  const [ticketName, setTicketName] = useState("Help Me Cancel My Order");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("High");
  const [ticketType, setTicketType] = useState("Incident");
  const [requester, setRequester] = useState("Nguyen Van A");
  const [assignee, setAssignee] = useState("Fikri Studio");
  const [tags, setTags] = useState<string[]>(["Support", "Order"]);
  const [tagInput, setTagInput] = useState("");
  const [followers, setFollowers] = useState(["Eder Militao"]);

  const navigate = useNavigate();

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
      e.preventDefault();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const removeFollower = (followerToRemove: string) => {
    setFollowers(followers.filter((f) => f !== followerToRemove));
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          Create New Ticket
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Message */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <div className="mb-4">
              <span className="text-sm text-gray-500 mr-2">From</span>
              <select className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option>Fikri Studio Support</option>
              </select>
            </div>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 min-h-[200px] focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Comment or Type '/' For commands"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
    
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={ticketName}
                onChange={(e) => setTicketName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <div className="flex gap-2">
                {priorities.map((p) => (
                  <button
                    key={p}
                    className={`flex-1 px-3 py-2 rounded-md border text-sm font-medium flex items-center justify-center transition-all ${
                      priority === p
                        ? "bg-green-50 border-green-500 text-green-800 shadow-sm"
                        : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setPriority(p)}
                  >
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${p === 'High' ? 'bg-red-500' : p === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Type</label>
              <select className="w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-indigo-500 focus:border-indigo-500" value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
                {ticketTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Requester</label>
              <select className="w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-indigo-500 focus:border-indigo-500" value={requester} onChange={(e) => setRequester(e.target.value)}>
                {requesters.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
              <select className="w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-indigo-500 focus:border-indigo-500" value={assignee} onChange={(e) => setAssignee(e.target.value)}>
                {assignees.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <span key={tag} className="flex items-center bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1.5 text-gray-500 hover:text-gray-800">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Add tags..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Followers</label>
              <div className="flex flex-wrap gap-2">
                {followers.map((follower) => (
                  <span key={follower} className="flex items-center bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">
                    {follower}
                    <button onClick={() => removeFollower(follower)} className="ml-1.5 text-gray-500 hover:text-gray-800">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={handleClose}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
            }}
            className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Submit as New
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
