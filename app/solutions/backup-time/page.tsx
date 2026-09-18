import { backupHtmlContent } from './backup-html';

export default function BackupTimePage() {
    return (
        <div className="w-full bg-white p-6 min-h-screen">
            <div
                dangerouslySetInnerHTML={{ __html: backupHtmlContent }}
            />
        </div>
    );
}