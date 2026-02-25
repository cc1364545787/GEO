'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Globe,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Smartphone,
} from 'lucide-react';

const platforms = [
  {
    id: 'wechat',
    name: '微信公众号',
    icon: '📱',
    accounts: [
      { name: '华为官方', status: 'connected', lastSync: '10分钟前' },
      { name: '华为商城', status: 'expired', lastSync: '3天前' },
    ],
  },
  {
    id: 'zhihu',
    name: '知乎',
    icon: '💡',
    accounts: [
      { name: '华为手机官方', status: 'connected', lastSync: '1小时前' },
    ],
  },
  {
    id: 'xiaohongshu',
    name: '小红书',
    icon: '📕',
    accounts: [
      { name: '华为数码馆', status: 'connected', lastSync: '30分钟前' },
      { name: '华为生活馆', status: 'pending', lastSync: '-' },
    ],
  },
  {
    id: 'weibo',
    name: '微博',
    icon: '🐦',
    accounts: [
      { name: '华为终端', status: 'connected', lastSync: '2小时前' },
    ],
  },
  {
    id: 'toutiao',
    name: '今日头条',
    icon: '📰',
    accounts: [
      { name: '华为科技', status: 'connected', lastSync: '1小时前' },
    ],
  },
];

export default function AccountsPage() {
  const [activePlatform, setActivePlatform] = useState('wechat');

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">账号授权管理</h1>
          <p className="text-sm text-muted-foreground">
            管理多平台、多媒体账号的授权状态
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          添加账号
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* 左侧：平台列表 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">平台列表</CardTitle>
            <CardDescription>已授权 {platforms.length} 个平台</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {platforms.map((platform) => {
                const connectedCount = platform.accounts.filter(
                  (a) => a.status === 'connected'
                ).length;
                return (
                  <div
                    key={platform.id}
                    className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer transition-colors ${
                      activePlatform === platform.id
                        ? 'border-primary bg-primary/5'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setActivePlatform(platform.id)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{platform.icon}</span>
                      <div>
                        <p className="font-medium">{platform.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {connectedCount}/{platform.accounts.length} 已授权
                        </p>
                      </div>
                    </div>
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 右侧：账号详情 */}
        <Card className="col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>账号列表</CardTitle>
                <CardDescription>
                  管理已授权的平台账号，确保自动化发布正常运行
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                刷新状态
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platforms
                .find((p) => p.id === activePlatform)
                ?.accounts.map((account, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Smartphone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-sm text-muted-foreground">
                          最后同步：{account.lastSync}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {account.status === 'connected' && (
                        <Badge className="bg-green-500">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          已授权
                        </Badge>
                      )}
                      {account.status === 'expired' && (
                        <Badge variant="destructive">
                          <XCircle className="mr-1 h-3 w-3" />
                          已过期
                        </Badge>
                      )}
                      {account.status === 'pending' && (
                        <Badge variant="secondary">
                          <Clock className="mr-1 h-3 w-3" />
                          待授权
                        </Badge>
                      )}
                      {account.status === 'connected' ? (
                        <Button variant="outline" size="sm">
                          同步内容
                        </Button>
                      ) : (
                        <Button size="sm">重新授权</Button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 授权提示卡片 */}
      <Card className="mt-6 border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Globe className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold">授权说明</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                授权后，系统将通过本地设备自动化执行发布任务。授权有效期通常为30天，
                过期后需要重新授权。请确保账号状态正常，避免被封禁风险。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
