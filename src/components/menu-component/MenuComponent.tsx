'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import styles from "./MenuComponent.module.css"


const MenuComponent = () => {
    const pathname = usePathname();

    return (
        <nav className="flex justify-center items-center h-20 bg-black text-white shadow-[0_0_10px_rgba(255,_255,_255,_0.8)]">
            <Link href="/" className="flex justify-end items-center  w-1/4  text-2xl font-bold text-white hover:text-[#3af0f0]">
                <Image
                    src="/favicon/android-chrome-512x512.png"
                    alt="logo"
                    width={51}
                    height={51}
                />
                <div className={styles.logo}>
                <h1 className={styles.logoTitle}>Frame Flow</h1>
            </div>
            </Link>

            <ul className="flex justify-evenly items-center w-1/4">
                {[
                    { href: "/movies", label: "Movies" },
                    { href: "/login", label: "Sign In" },
                    { href: "/register", label: "Sign Up" },

                ].map(({ href, label }) => (
                    <li key={href}>
                        <Link
                            href={href}
                            className={`${
                                pathname === href
                                    ? "text-[#FFD700] underline"
                                    : "text-white hover:text-[#f2e499]"
                            }`}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className={styles.rightBlock}>


                  {/*<UserInfoComponent user={user} onLogout={onLogout} />*/}


                <div className={styles.themeSwitcher}>
                    <button
                        // onClick={handlerDark}
                        title="Dark Theme"
                        className={`${styles.themeButton} ${styles.darkCircle}`}
                    />
                    <button
                        // onClick={handlerLight}
                        title="Light Theme"
                        className={`${styles.themeButton} ${styles.lightCircle}`}
                    />
                </div>
            </div>
        </nav>
    );
};

export default MenuComponent;
