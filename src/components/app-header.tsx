'use client';

import { Bell, Search, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      {/* 搜索框 */}
      <div className="flex items-center gap-4">
        <div className="relative w-80 left-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索产品、文章、任务..."
            className="pl-9"
          />
        </div>
      </div>

      {/* 右侧工具栏 */}
      <div className="flex items-center gap-3">
        {/* 快速向导按钮 */}
        <Button variant="outline" size="sm" className="gap-2">
          <span>快速上手</span>
        </Button>

        {/* 主题切换 */}
        <ThemeToggle />

        {/* 通知 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>通知中心</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-medium">文章收录成功</span>
                  <Badge variant="secondary" className="text-xs">刚刚</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  文章《如何提升品牌在AI平台的曝光》已被 Kimi 收录
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-medium">发布任务完成</span>
                  <Badge variant="secondary" className="text-xs">10分钟前</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  批量发布 15 篇文章到微信公众号完成
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-medium">优化建议</span>
                  <Badge variant="secondary" className="text-xs">1小时前</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  发现 3 个高价值搜索词可以优化
                </p>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 用户信息 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                <AvatarFallback>王</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">王经理</span>
                <span className="text-xs text-muted-foreground">专业版</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>我的账户</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              个人设置
            </DropdownMenuItem>
            <DropdownMenuItem>账单中心</DropdownMenuItem>
            <DropdownMenuItem>API 密钥</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
