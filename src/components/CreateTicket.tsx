import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthProvider";
import type { CreateTicketDto, TicketType, TicketPriority } from "../services/ticketService";
import { ticketService } from "../services/ticketService";

interface CreateTicketProps {
  onAdd: (ticket: any) => void;
}

const priorities: ("Low" | "Medium" | "High")[] = ["Low", "Medium", "High"];
const ticketTypes = ["Incident", "Question", "Suggestion", "Problem"];
const requesters = ["Nguyen Van A", "Ngo Van B", "Hoang Thi C"];
const assignees = ["Fikri Studio", "Support Team", "Dev Team"];

const CreateTicket: React.FC<CreateTicketProps> = ({ onAdd }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [ticketName, setTicketName] = useState("Help Me Cancel My Order");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("High");
  const [ticketType, setTicketType] = useState("Incident");
  const [requester, setRequester] = useState("Nguyen Van A");
  const [assignee, setAssignee] = useState("Fikri Studio");
  const [tags, setTags] = useState<string[]>(["Support", "Order"]);
  const [tagInput, setTagInput] = useState("");
  const [followerInput, setFollowerInput] = useState("");
  const [followers, setFollowers] = useState(["Eder Militao"]);
  const [customerId, setCustomerId] = useState<number | null>(4);

  // Fetch customers
  const { data: customers = [], isLoading: customersLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await api.get("/customers");
      return res.data?.data || [];
    },
  });

  const createTicketMutation = useMutation({
    mutationFn: (payload: CreateTicketDto) => ticketService.createTicket(payload),
    onSuccess: (newTicket) => {
      onAdd(newTicket);
      toast.success("Tạo ticket thành công");
      setTicketName("");
      setMessage("");
      setPriority("High");
      setTicketType("Incident");
      setRequester("Nguyen Van A");
      setAssignee("Fikri Studio");
      setTags(["Support", "Order"]);
      setFollowers(["Eder Militao"]);
      setCustomerId(null);
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      navigate("/ticket");
    },
    onError: (error: any) => {
      toast.error("Tạo ticket thất bại: " + (error?.response?.data?.message || error.message));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== "ADMIN") {
      toast.error("Bạn không có quyền tạo ticket.");
      return;
    }
    if (!customerId) {
      toast.error("Vui lòng chọn khách hàng.");
      return;
    }

    const payload: CreateTicketDto = {
      title: ticketName.trim(),
      description: message.trim() || "No description",
      customerId,
      type: ticketType.toUpperCase() as TicketType,
      priority: priority.toUpperCase() as TicketPriority,
      tags,
      followerIds: followers.map(() => 1),
    };

    createTicketMutation.mutate(payload);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      if (!tags.includes(tagInput.trim())) setTags([...tags, tagInput.trim()]);
      setTagInput("");
      e.preventDefault();
    }
  };

  const handleAddFollower = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && followerInput.trim()) {
      if (!followers.includes(followerInput.trim())) setFollowers([...followers, followerInput.trim()]);
      setFollowerInput("");
      e.preventDefault();
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));
  const removeFollower = (f: string) => setFollowers(followers.filter((i) => i !== f));

  return (
    <div className="flex flex-col bg-gray-50">
      <div className="max-w-7xl mx-auto w-full p-4">
        <h2 className="text-xl font-bold mb-4">Create New Ticket</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white rounded-lg shadow p-4">
          {/* LEFT COLUMN - MESSAGE */}
          <div className="flex flex-col gap-3 border-r border-gray-200 pr-3">
            <h3 className="text-base font-semibold text-gray-800 mb-1">Message</h3>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">From</label>
              <select className="w-full border border-gray-300 rounded p-1.5 text-sm">
                <option>Fikri Studio Support</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Comment or Type “/” for commands</label>
              <textarea
                className="w-full border border-gray-300 rounded p-1.5 min-h-[120px] focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
              />
            </div>
          </div>

          {/* RIGHT COLUMN - TICKET INFO */}
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Ticket Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-1.5 text-sm"
                value={ticketName}
                onChange={(e) => setTicketName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Priority</label>
              <div className="flex gap-2">
                {priorities.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`px-3 py-0.5 rounded border text-xs ${
                      priority === p ? "bg-green-100 border-green-500 text-green-700" : "border-gray-300 text-gray-600"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Ticket Type</label>
              <select
                className="w-full border border-gray-300 rounded p-1.5 text-sm"
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
              >
                {ticketTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Requester</label>
              <select
                className="w-full border border-gray-300 rounded p-1.5 text-sm"
                value={requester}
                onChange={(e) => setRequester(e.target.value)}
              >
                {requesters.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Assignee</label>
              <select
                className="w-full border border-gray-300 rounded p-1.5 text-sm"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              >
                {assignees.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Tags</label>
              <div className="flex flex-wrap gap-1 mb-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1 text-blue-500 hover:text-blue-800">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add tags..."
                className="w-full border border-gray-300 rounded p-1.5 text-sm"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
              />
            </div>

            {/* Followers */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Followers</label>
              <div className="flex flex-wrap gap-1 mb-1">
                {followers.map((f) => (
                  <span
                    key={f}
                    className="flex items-center bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full"
                  >
                    {f}
                    <button onClick={() => removeFollower(f)} className="ml-1 text-gray-500 hover:text-gray-800">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add followers..."
                className="w-full border border-gray-300 rounded p-1.5 text-sm"
                value={followerInput}
                onChange={(e) => setFollowerInput(e.target.value)}
                onKeyDown={handleAddFollower}
              />
            </div>

            {/* Client */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Client</label>
              <select
                className="w-full border border-gray-300 rounded p-1.5 text-sm"
                value={customerId ?? ""}
                onChange={(e) => setCustomerId(Number(e.target.value))}
              >
                <option value="">{customersLoading ? "Đang tải..." : "Chọn khách hàng..."}</option>
                {customers.map((c: { id: number; name: string }) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <button
                type="button"
                onClick={() => navigate("/ticket")}
                className="px-3 py-1.5 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createTicketMutation.isPending}
                className="px-4 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                {createTicketMutation.isPending ? "Đang tạo..." : "Submit as New"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
