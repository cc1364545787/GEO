'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Key,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useState } from 'react';

const apiKeys = [
  {
    id: 1,
    name: '生产环境密钥',
    key: 'sk-geo-prod-xxxxxxxxxxxx',
    prefix: 'sk-geo-prod',
    createdAt: '2024-02-15',
    lastUsed: '刚刚',
    status: 'active',
    permissions: ['read', 'write', 'publish'],
  },
  {
    id: 2,
    name: '测试环境密钥',
    key: 'sk-geo-test-yyyyyyyyyyyy',
    prefix: 'sk-geo-test',
    createdAt: '2024-03-01',
    lastUsed: '2小时前',
    status: 'active',
    permissions: ['read', 'write'],
  },
  {
    id: 3,
    name: '旧版密钥（已过期）',
    key: 'sk-geo-old-zzzzzzzzzzzz',
    prefix: 'sk-geo-old',
    createdAt: '2024-01-10',
    lastUsed: '30天前',
    status: 'expired',
    permissions: ['read'],
  },
];

export default function KeysPage() {
  const [showKey, setShowKey] = useState<number | null>(null);

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">密钥管理</h1>
          <p className="text-sm text-muted-foreground">
            管理API密钥和设备认证密钥
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          创建密钥
        </Button>
      </div>

      {/* 安全提示 */}
      <Card className="mb-6 border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50/50 to-orange-50/50 dark:from-yellow-950/30 dark:to-orange-950/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <h3 className="font-semibold">安全提示</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                API密钥具有敏感权限，请妥善保管，不要在公开代码或日志中泄露。
                如发现密钥泄露，请立即删除并重新生成。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API密钥列表 */}
      <Card>
        <CardHeader>
          <CardTitle>API 密钥</CardTitle>
          <CardDescription>用于调用平台API的认证密钥</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Key className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{apiKey.name}</h3>
                        {apiKey.status === 'active' ? (
                          <Badge className="bg-green-500">有效</Badge>
                        ) : (
                          <Badge variant="destructive">已过期</Badge>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <code className="rounded bg-muted px-2 py-0.5 text-sm font-mono">
                          {showKey === apiKey.id
                            ? apiKey.key
                            : `${apiKey.prefix}-••••••••••••`}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            setShowKey(showKey === apiKey.id ? null : apiKey.id)
                          }
                        >
                          {showKey === apiKey.id ? (
                            <EyeOff className="h-3 w-3" />
                          ) : (
                            <Eye className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            navigator.clipboard.writeText(apiKey.key);
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>创建于 {apiKey.createdAt}</span>
                        <span>•</span>
                        <span>最后使用 {apiKey.lastUsed}</span>
                        <span>•</span>
                        <span>权限: {apiKey.permissions.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      编辑权限
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 设备认证密钥 */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            设备认证密钥
          </CardTitle>
          <CardDescription>
            用于本地设备与平台通信的认证密钥
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">设备通信密钥</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    用于Chrome插件与平台的安全通信
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    已配置
                  </Badge>
                  <Button variant="outline" size="sm">
                    重新生成
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-dashed p-6">
              <div className="text-center">
                <Shield className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  设备密钥已安全存储，仅在实际使用时解密
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
