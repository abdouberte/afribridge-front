"use client";

export type NavSection = "orders" | "revenue" | "settings";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-left",
        "text-sm font-bold transition-colors duration-150",
        active
          ? "bg-afri-terra/20 text-afri-terra"
          : "text-white/40 hover:text-white/70 hover:bg-white/5",
      ].join(" ")}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

interface Props {
  section: NavSection;
  onSection: (s: NavSection) => void;
  onLogout: () => void;
}

const NAV_ITEMS: {
  section: NavSection;
  label: string;
  path: string;
}[] = [
  {
    section: "orders",
    label: "Commandes",
    path: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2",
  },
  {
    section: "revenue",
    label: "Revenus",
    path: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    section: "settings",
    label: "Config",
    path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

export default function AdminSidebar({ section, onSection, onLogout }: Props) {
  return (
    <aside
      className="flex flex-col shrink-0 px-2 md:px-3 py-4 gap-1"
      style={{
        background: "#1C0E06",
        width: "clamp(64px, 15vw, 220px)",
        minWidth: "64px",
      }}
    >
      {/* Logo */}
      <div className="px-2 pb-4 mb-1 border-b border-white/10">
        <p className="text-sm font-black text-white truncate">
          Afri<span className="text-afri-terra">Bridge</span>
        </p>
        <p
          className="text-xs font-bold mt-0.5 truncate hidden sm:block"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Administration
        </p>
      </div>

      {/* Nav */}
      {NAV_ITEMS.map(({ section: s, label, path }) => (
        <NavItem
          key={s}
          label={label}
          active={section === s}
          onClick={() => onSection(s)}
          icon={
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={path} />
            </svg>
          }
        />
      ))}

      {/* Logout */}
      <button
        onClick={onLogout}
        className="mt-auto flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        <svg
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span className="hidden sm:inline">Déconnexion</span>
      </button>
    </aside>
  );
}
