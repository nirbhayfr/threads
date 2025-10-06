"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants";
import { useAuth } from "@clerk/nextjs";

function Bottombar() {
     const auth = useAuth();
     const pathname = usePathname();
     if (!auth.isLoaded) return null;
     const id = auth.userId;

     return (
          <section className="bottombar">
               <div className="bottombar_container">
                    {sidebarLinks.map((link) => {
                         const isActive =
                              (pathname.includes(link.route) &&
                                   link.route.length > 1) ||
                              pathname === link.route;

                         const finalRoute = link.route.startsWith("/profile")
                              ? `${link.route}/${id}`
                              : link.route;

                         return (
                              <Link
                                   href={finalRoute}
                                   key={link.label}
                                   className={`bottombar_link ${
                                        isActive && "bg-primary-500"
                                   }`}
                              >
                                   <Image
                                        src={link.imgURL}
                                        alt={link.label}
                                        width={24}
                                        height={24}
                                   />
                                   <p className="text-light-1 text-subtle-medium max-sm:hidden">
                                        {link.label.split(/\s+/)[0]}
                                   </p>
                              </Link>
                         );
                    })}
               </div>
          </section>
     );
}

export default Bottombar;
