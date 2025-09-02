'use client';

import { registerAction } from '@/services/auth_services/registerAction';
import Form from 'next/form';
import Link from 'next/link';
import { useState } from 'react';
import { LoaderComponent } from '@/components/loader-component/LoaderComponent';
import {useRouter} from "next/navigation";
import styles from './RegisterComponent.module.css';
import Image from 'next/image';

export default function RegisterComponent() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    return (
        <div className={styles.centerContainer}>
            <Form
                action={async (formData) => {
                    setLoading(true);
                    const result = await registerAction(formData);

                    if (result?.error) {
                        setErrorMsg(result.error);
                    } else {
                        setErrorMsg('');
                        router.push('/movies');
                    }
                    setLoading(false);
                }
            }
                className={`auth ${styles.form}`}

            >
                <h2 className={styles.title}>Sign Up</h2>

                <div className={styles.inputGroup}>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className={styles.input}
                    />
                    <div className={styles.icon}>
                        <Image
                            src="/images/userImg.png"
                            alt="user icon"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        required
                        className={styles.input}
                    />
                    <div
                        className={styles.icon}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            src={showPassword ? '/images/eye.png' : '/images/noEye.png'}
                            alt="toggle password"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type={showConfirmPassword? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        className={styles.input}
                    />
                    <div
                        className={styles.icon}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <Image
                            src={showConfirmPassword? '/images/eye.png' : '/images/noEye.png'}
                            alt="toggle confirm password"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>

                {errorMsg && <p className={styles.error}>{errorMsg}</p>}

                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? (
                        <div className={styles.loaderWrapper}>
                            <LoaderComponent fillColor="#000000" centerColor="#FFD700"/>
                        </div>
                    ) : 'Sign Up'}
                </button>

                <div className={styles.bottomContainer}>
                    <p className={styles.registerText}>
                        Already have an account?{' '}
                        <Link href="/login" className={styles.link}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </Form>
        </div>
    );
}
