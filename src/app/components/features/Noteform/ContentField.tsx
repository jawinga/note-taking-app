export function ContentField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor="content" className="text-sm font-semibold">
        Note Content
      </label>
      <textarea
        id="content"
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg resize-none"
        placeholder="Write your note…"
      />
    </div>
  );
}
