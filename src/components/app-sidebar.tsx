'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Lightbulb,
  BookOpen,
  Send,
  Settings,
  BarChart3,
  Database,
  FileText,
  Bot,
  Globe,
  Zap,
  ChevronDown,
  ChevronRight,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';

type NavItem = {
  title: string;
  icon: LucideIcon;
  href?: string;
  badge?: string | null;
  children?: { title: string; href: string; icon: LucideIcon }[];
};

const navigation: NavItem[] = [
  {
    title: '工作台',
    icon: LayoutDashboard,
    href: '/',
    badge: null,
  },
  {
    title: '洞察与策略',
    icon: Lightbulb,
    children: [
      { title: '多维洞察', href: '/insight/discovery', icon: Sparkles },
      { title: '优化策略', href: '/insight/strategy', icon: TrendingUp },
      { title: '效果衡量', href: '/insight/measurement', icon: BarChart3 },
    ],
  },
  {
    title: '知识资产',
    icon: BookOpen,
    children: [
      { title: '产品管理', href: '/knowledge/products', icon: Database },
      { title: '知识库', href: '/knowledge/library', icon: BookOpen },
      { title: '问题拓展', href: '/knowledge/questions', icon: Bot },
      { title: '文章生成', href: '/knowledge/articles', icon: FileText },
    ],
  },
  {
    title: '分发与收录',
    icon: Send,
    children: [
      { title: '账号授权', href: '/publish/accounts', icon: Globe },
      { title: '发布任务', href: '/publish/tasks', icon: Zap },
      { title: '收录追踪', href: '/publish/tracking', icon: BarChart3 },
    ],
  },
  {
    title: '系统设置',
    icon: Settings,
    children: [
      { title: '设备管理', href: '/settings/devices', icon: Database },
      { title: '密钥管理', href: '/settings/keys', icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>(['洞察与策略', '知识资产']);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((m) => m !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-sidebar">
      {/* Logo区域 */}
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">未来未科技 GEO平台</span>
          <span className="text-xs text-muted-foreground">AI搜索引擎优化</span>
        </div>
      </div>

      {/* 导航区域 */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            if (!item.children) {
              // 单级菜单项
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.title}
                  href={item.href!}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            }

            // 多级菜单项
            const isOpen = openMenus.includes(item.title);
            const hasActiveChild = item.children.some(
              (child) => pathname === child.href
            );

            return (
              <Collapsible
                key={item.title}
                open={isOpen}
                onOpenChange={() => toggleMenu(item.title)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start gap-3 px-3',
                      hasActiveChild && 'bg-accent text-accent-foreground'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                    <ChevronDown
                      className={cn(
                        'ml-auto h-4 w-4 transition-transform',
                        isOpen && 'rotate-180'
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 space-y-1 pt-1">
                  {item.children.map((child) => {
                    const isActive = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        <child.icon className="h-3.5 w-3.5" />
                        {child.title}
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </nav>
      </ScrollArea>

      {/* 底部信息 */}
      <div className="border-t p-4">
        <div className="rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-500" />
            <span className="text-xs font-medium">设备状态</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            <span className="text-xs text-muted-foreground">2 台设备在线</span>
          </div>
        </div>
      </div>
    </div>
  );
}
