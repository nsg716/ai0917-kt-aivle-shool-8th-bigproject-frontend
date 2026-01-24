import { AdminNotices } from '../admin/AdminNotices';
import { useContext, useEffect } from 'react';
import { AuthorBreadcrumbContext } from './AuthorBreadcrumbContext';

interface AuthorNoticeProps {
  integrationId: string;
}

export function AuthorNotice({ integrationId }: AuthorNoticeProps) {
  const { setBreadcrumbs, onNavigate } = useContext(AuthorBreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      { label: '홈', onClick: () => onNavigate('home') },
      { label: '공지사항' },
    ]);
  }, [setBreadcrumbs, onNavigate]);

  // AdminNotices를 재사용하되, readOnly 모드로 전달하여 수정/삭제/생성 기능을 비활성화합니다.
  return <AdminNotices readOnly={true} />;
}
