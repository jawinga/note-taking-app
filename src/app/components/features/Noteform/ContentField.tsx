import { FileText } from "lucide-react";

export function ContentField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-gray-500" />
        <label
          htmlFor="content"
          className="block text-sm font-semibold text-gray-800"
        >
          Note Content
        </label>
      </div>
      <textarea
        id="content"
        value={value}
        placeholder="Write your detailed note content here. You can include ideas, observations, tasks, or any information you want to remember..."
        name="content"
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 resize-none"
      />
    </div>
  );
}
