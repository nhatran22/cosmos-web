'use client';

import { useCallback, useRef, useState } from 'react';

const BACKUP_TIME_HTML_SRC = '/solution-file/cosmos-backup-time-calculation_1.html';

export default function BackupTimePage() {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iframeHeight, setIframeHeight] = useState(1600);

    const syncIframeHeight = useCallback(() => {
        const doc = iframeRef.current?.contentDocument;
        if (!doc) return;

        const nextHeight = Math.max(
            doc.documentElement.scrollHeight,
            doc.body?.scrollHeight ?? 0
        );

        if (nextHeight > 0) {
            setIframeHeight(nextHeight);
        }
    }, []);

    return (
        <iframe
            ref={iframeRef}
            src={BACKUP_TIME_HTML_SRC}
            title="Backup Time Calculation for UPS Systems"
            className="w-full border-0 bg-white"
            style={{ height: iframeHeight }}
            onLoad={syncIframeHeight}
        />
    );
}
