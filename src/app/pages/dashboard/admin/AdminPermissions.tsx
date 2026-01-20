import { useState } from "react";
import { Shield, Users, FileText, X as CloseIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";

const initialUsers = [
  {
    name: "시스템 관리자",
    email: "admin@example.com",
    role: "관리자",
    roleBadge: "bg-red-500 text-white",
    status: "활성",
    statusBadge: "bg-green-500 text-white",
    date: "2023.01.15",
    initial: "관",
    initialGradient: "from-red-500 to-pink-600",
  },
  {
    name: "박지영",
    email: "operator1@example.com",
    role: "운영자",
    roleBadge: "bg-blue-500 text-white",
    status: "활성",
    statusBadge: "bg-green-500 text-white",
    date: "2024.05.22",
    initial: "박",
    initialGradient: "from-blue-500 to-purple-600",
  },
  {
    name: "김민지",
    email: "author1@example.com",
    role: "작가",
    roleBadge: "bg-green-500 text-white",
    status: "활성",
    statusBadge: "bg-green-500 text-white",
    date: "2025.11.03",
    initial: "김",
    initialGradient: "from-green-500 to-teal-600",
  },
  {
    name: "이서준",
    email: "author2@example.com",
    role: "작가",
    roleBadge: "bg-green-500 text-white",
    status: "휴면",
    statusBadge: "border-border text-muted-foreground",
    statusVariant: "outline",
    date: "2025.08.14",
    initial: "이",
    initialGradient: "from-yellow-500 to-orange-600",
  },
];

interface PermissionEditModalProps {
  user: any;
  onClose: () => void;
  onSave: (user: any) => void;
}

function PermissionEditModal({
  user,
  onClose,
  onSave,
}: PermissionEditModalProps) {
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);

  const handleSave = () => {
    onSave({ ...user, role, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-card border border-border rounded-lg shadow-lg">
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">
            권한 수정
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:bg-muted transition-colors"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${user.initialGradient} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
              {user.initial}
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-medium text-foreground truncate">
                {user.name}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground break-all">
                {user.email}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <div className="text-xs sm:text-sm text-muted-foreground">
                역할
              </div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground"
              >
                <option value="운영자">운영자</option>
                <option value="작가">작가</option>
              </select>
            </div>
            <div className="space-y-1">
              <div className="text-xs sm:text-sm text-muted-foreground">
                상태
              </div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground"
              >
                <option value="활성">활성</option>
                <option value="휴면">휴면</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs sm:text-sm text-muted-foreground">
              가입일
            </div>
            <div className="text-sm text-foreground">
              {user.date}
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-5 border-t border-border flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-3 sm:px-4 text-sm"
          >
            취소
          </Button>
          <Button
            onClick={handleSave}
            className="px-3 sm:px-4 text-sm bg-purple-600 hover:bg-purple-700 text-white"
          >
            수정 완료
          </Button>
        </div>
      </div>
    </div>
  );
}

export function AdminPermissions() {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const applyRoleStatusStyles = (user: any) => {
    let roleBadge = user.roleBadge;
    let statusBadge = user.statusBadge;
    let statusVariant = user.statusVariant;

    if (user.role === "관리자") {
      roleBadge = "bg-red-500 text-white";
    } else if (user.role === "운영자") {
      roleBadge = "bg-blue-500 text-white";
    } else {
      roleBadge = "bg-green-500 text-white";
    }

    if (user.status === "휴면") {
      statusVariant = "outline";
      statusBadge = "border-border text-muted-foreground";
    } else {
      statusVariant = undefined;
      statusBadge = "bg-green-500 text-white";
    }

    return {
      ...user,
      roleBadge,
      statusBadge,
      statusVariant,
    };
  };

  const handleEditClick = (user: any) => {
    if (user.role === "관리자") {
      return;
    }
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleSavePermission = (updatedUser: any) => {
    const styledUser = applyRoleStatusStyles(updatedUser);
    setUsers((prev) =>
      prev.map((user) =>
        user.email === styledUser.email ? styledUser : user
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg text-foreground font-semibold">
              권한
            </h2>
          </div>
        </div>
        <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white">
          <Users className="w-4 h-4 mr-2" />새 사용자 추가
        </Button>
      </div>

      {/* 역할별 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <div className="text-2xl text-foreground font-bold">
                  3
                </div>
                <div className="text-sm text-muted-foreground">
                  관리자
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl text-foreground font-bold">
                  12
                </div>
                <div className="text-sm text-muted-foreground">
                  운영자
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl text-foreground font-bold">
                  1,232
                </div>
                <div className="text-sm text-muted-foreground">
                  작가
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 사용자 목록 */}
      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
            <CardTitle className="text-foreground">
              사용자 목록
            </CardTitle>
            <Input
              placeholder="사용자 검색..."
              className="w-full md:max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    사용자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    이메일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    역할
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    가입일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {users.map((user, idx) => (
                  <tr key={idx} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-gradient-to-br ${user.initialGradient} rounded-full flex items-center justify-center text-white text-xs font-semibold`}>
                          {user.initial}
                        </div>
                        <span className="text-sm text-foreground">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={user.roleBadge}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={user.statusVariant as any}
                        className={user.statusBadge}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {user.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border"
                        onClick={() => handleEditClick(user)}
                        disabled={user.role === "관리자"}
                      >
                        수정
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-border">
            {users.map((user, idx) => (
              <div key={idx} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${user.initialGradient} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
                      {user.initial}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-sm text-muted-foreground break-all">{user.email}</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border"
                    onClick={() => handleEditClick(user)}
                    disabled={user.role === "관리자"}
                  >
                    수정
                  </Button>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">역할</span>
                  <Badge className={user.roleBadge}>{user.role}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">상태</span>
                  <Badge variant={user.statusVariant as any} className={user.statusBadge}>{user.status}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">가입일</span>
                  <span className="text-foreground">{user.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {showEditModal && selectedUser && (
        <PermissionEditModal
          user={selectedUser}
          onClose={() => setShowEditModal(false)}
          onSave={handleSavePermission}
        />
      )}
    </div>
  );
}
