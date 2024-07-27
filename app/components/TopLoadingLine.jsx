'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TopLoadingLine = () => {
    const router = typeof window !== 'undefined' ? useRouter() : null;
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        if (!router) return;

        const handleStart = () => {
            setLoadingProgress(80);
        };
        const handleComplete = () => {
            setLoadingProgress(100);
            setTimeout(() => {
                setLoadingProgress(0);
            }, 500);
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, [router]);

    return (
        <div className='topLoadingLine' style={{ width: `${loadingProgress}%` }} />
    );
};

export default TopLoadingLine;
