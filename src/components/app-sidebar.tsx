'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
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
  ChevronLeft,
  ChevronRight, // 新增：展开图标
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
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
  const router = useRouter();
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>(['洞察与策略', '知识资产']);
  
  // 新增：控制整个侧边栏是否折叠的状态
  const [isCollapsed, setIsCollapsed] = useState(false); 

  const toggleMenu = (title: string) => {
    // 如果在折叠状态下点击了父级菜单，先展开整个侧边栏
    if (isCollapsed) {
      setIsCollapsed(false);
      if (!openMenus.includes(title)) {
        setOpenMenus((prev) => [...prev, title]);
      }
      return;
    }

    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((m) => m !== title)
        : [...prev, title]
    );
  };

  return (
    // 容器加上 relative 方便定位折叠按钮，并根据 isCollapsed 切换宽度
    <div
      className={cn(
        'relative sticky top-0 flex h-screen shrink-0 flex-col border-r bg-background transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* 折叠/展开 悬浮控制按钮 */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute -right-3 top-6 z-50 h-6 w-6 rounded-full border shadow-sm p-0 hover:bg-accent hover:text-accent-foreground"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      {/* Logo区域 */}
      <div onClick={() => router.push('/')} className={cn("flex h-16 shrink-0 items-center border-b px-4 overflow-hidden", isCollapsed ? "justify-center px-0" : "gap-3")}>
        <div className="cursor-pointer flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        {!isCollapsed && (
          <div
            className="flex flex-col cursor-pointer transition-opacity hover:opacity-80 overflow-hidden"
          >
            <span className="text-md font-semibold truncate">未来未科技GEO平台</span>
            <span className="text-[12px] text-muted-foreground mt-0.5 truncate">AI搜索引擎优化</span>
          </div>
        )}
      </div>

      {/* 导航区域 */}
      <ScrollArea className="flex-1 px-3 py-4 overflow-hidden">
        <nav className="space-y-1">
          {navigation.map((item) => {
            // 单级菜单项
            if (!item.children) {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.title}
                  href={item.href!}
                  title={isCollapsed ? item.title : undefined} // 折叠时提供 tooltip 提示
                  className={cn(
                    'flex items-center rounded-lg py-2 text-sm font-medium transition-colors',
                    isCollapsed ? 'justify-center px-0' : 'gap-3 px-3',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="truncate">{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                          {item.badge}
                        </span>
                      )}
                    </>
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
                open={!isCollapsed && isOpen} // 折叠时强制收起子菜单
                onOpenChange={() => toggleMenu(item.title)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    title={isCollapsed ? item.title : undefined}
                    className={cn(
                      'w-full py-2 h-auto text-sm',
                      isCollapsed ? 'justify-center px-0' : 'justify-start gap-3 px-3',
                      hasActiveChild && 'bg-accent text-accent-foreground font-medium'
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="truncate">{item.title}</span>
                        <ChevronDown
                          className={cn(
                            'ml-auto h-4 w-4 shrink-0 transition-transform duration-200',
                            isOpen && 'rotate-180'
                          )}
                        />
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
                
                {/* 折叠时不渲染子菜单内容 */}
                {!isCollapsed && (
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
                              ? 'bg-accent text-accent-foreground font-medium'
                              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          )}
                        >
                          <child.icon className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{child.title}</span>
                        </Link>
                      );
                    })}
                  </CollapsibleContent>
                )}
              </Collapsible>
            );
          })}
        </nav>
      </ScrollArea>

      {/* 底部信息 */}
      <div className="shrink-0 border-t p-4 flex justify-center">
        <div className={cn(
          "rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-3 flex w-full transition-all",
          isCollapsed ? "justify-center p-2" : "flex-col"
        )}>
          <div className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-2")}>
            <Zap className="h-4 w-4 text-blue-500 shrink-0" title={isCollapsed ? "2台设备在线" : undefined} />
            {!isCollapsed && <span className="text-xs font-medium truncate">设备状态</span>}
          </div>
          {!isCollapsed && (
            <div className="mt-2 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500 shrink-0"></div>
              <span className="text-xs text-muted-foreground truncate">2 台设备在线</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}