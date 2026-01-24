import { useContext, useEffect } from 'react';
import { AuthorBreadcrumbContext } from './AuthorBreadcrumbContext';
import { User, Mail, Shield, Calendar, BookOpen, Database } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { authorService } from '../../../services/authorService';
import { AuthorMyPageDto } from '../../../types/author';

interface AuthorMyPageProps {
  onChangePassword: () => void;
  userData: any;
}

export function AuthorMyPage({
  onChangePassword,
  userData: authUserData,
}: AuthorMyPageProps) {
  const { setBreadcrumbs, onNavigate } = useContext(AuthorBreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      { label: '홈', onClick: () => onNavigate('home') },
      { label: '마이페이지' },
    ]);
  }, [setBreadcrumbs, onNavigate]);

  const navigate = useNavigate();
  const userId = authUserData?.userId;

  // Fetch My Page Data
  const { data: myPageData, isLoading } = useQuery({
    queryKey: ['author', 'mypage', userId],
    queryFn: () => authorService.getMyPage(String(userId)),
    enabled: !!userId,
  });

  const userData = (myPageData as unknown as AuthorMyPageDto) || authUserData;

  const handleDeleteAccount = async () => {
    if (
      confirm(
        '정말로 계정을 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없으며 모든 데이터가 삭제됩니다.',
      )
    ) {
      try {
        await authService.deleteAccount();
        alert('계정이 탈퇴되었습니다.');
        await authService.logout();
        navigate('/');
      } catch (error) {
        console.error('Account deletion failed', error);
        alert('계정 탈퇴에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  if (!authUserData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">마이페이지</h2>
        <p className="text-muted-foreground">
          내 정보를 확인하고 계정을 관리합니다.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
            <CardDescription>
              계정의 기본 정보입니다. 수정이 필요한 경우 관리자에게 문의하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>이름</Label>
              <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{userData.name || '알 수 없음'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>이메일</Label>
              <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {userData.email || '알 수 없음'}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>권한</Label>
              <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{userData.role || 'Author'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>가입일</Label>
              <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {userData.createdAt
                    ? format(new Date(userData.createdAt), 'yyyy.MM.dd')
                    : '-'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>활동 요약</CardTitle>
              <CardDescription>
                나의 작품 활동 및 IP 확장 현황입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-muted/30">
                  <BookOpen className="w-8 h-8 mb-2 text-primary" />
                  <span className="text-2xl font-bold">
                    {userData.worksCount || 0}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    등록된 작품
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-muted/30">
                  <Database className="w-8 h-8 mb-2 text-green-600" />
                  <span className="text-2xl font-bold">
                    {userData.ipExpansionCount || 0}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    IP 확장 진행
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>계정 관리</CardTitle>
              <CardDescription>
                비밀번호 변경 및 계정 탈퇴를 수행할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={onChangePassword} className="flex-1">
                  비밀번호 변경
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  className="flex-1"
                >
                  계정 탈퇴
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
