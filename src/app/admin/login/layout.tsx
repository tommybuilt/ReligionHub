export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(199,154,77,0.18),transparent_28%),#faf8f5]">
      {children}
    </div>
  );
}
