import {NavLink} from '../common/NavLink';
import {navItems} from './adminMenu';

export const Sidebar = () => {
  return (
    <aside className="hidden w-64 bg-gray-900 lg:block">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center justify-center border-b border-gray-600">
          <h1 className="text-xl font-semibold text-white">Anvaya <span className="font-light">Billing</span></h1>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
    );  
}