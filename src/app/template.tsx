/** Re-mounts on every navigation, giving a short fade-up route transition (CSS only). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
