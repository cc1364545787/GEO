import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';

export const metadata: Metadata = {
  title: {
    default: '未来未科技 GEO平台 - AI搜索引擎优化',
    template: '%s | GEO 平台',
  },
  description:
    'GEO营销自动化SaaS平台，赋能企业在AI时代的品牌曝光与流量获取',
  keywords: [
    'GEO',
    'SEO',
    'AI优化',
    '品牌营销',
    '搜索引擎优化',
    '大模型优化',
  ],
  authors: [{ name: 'GEO Platform Team' }],
  generator: 'Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen overflow-hidden">
            {/* 侧边栏 */}
            <AppSidebar />
            
            {/* 主内容区域 */}
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* 顶栏 */}
              <AppHeader />
              
              {/* 页面内容 */}
              <main className="flex-1 overflow-auto bg-muted/30">
                {isDev && <Inspector />}
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
