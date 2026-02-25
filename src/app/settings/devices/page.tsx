'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Monitor,
  Smartphone,
  CheckCircle2,
  XCircle,
  Clock,
  Settings,
  RefreshCw,
  Power,
  Download,
  Wifi,
} from 'lucide-react';

const devices = [
  {
    id: 'SUK-WIN-001',
    name: '办公电脑-A',
    type: 'Windows',
    status: 'online',
    ip: '192.168.1.100',
    lastActive: '刚刚',
    tasks: 3,
    pluginVersion: '2.3.1',
    chromePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  },
  {
    id: 'SUK-WIN-002',
    name: '测试设备-B',
    type: 'Windows',
    status: 'online',
    ip: '192.168.1.101',
    lastActive: '5分钟前',
    tasks: 1,
    pluginVersion: '2.3.0',
    chromePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  },
  {
    id: 'SUK-WIN-003',
    name: '备用设备-C',
    type: 'Windows',
    status: 'offline',
    ip: '192.168.1.102',
    lastActive: '2小时前',
    tasks: 0,
    pluginVersion: '2.2.8',
    chromePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  },
];

export default function DevicesPage() {
  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">设备管理</h1>
          <p className="text-sm text-muted-foreground">
            管理挂载的本地设备和Chrome插件状态
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            下载插件
          </Button>
          <Button className="gap-2">
            <Monitor className="h-4 w-4" />
            添加设备
          </Button>
        </div>
      </div>

      {/* 设备统计 */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {[
          { title: '在线设备', value: 2, color: 'text-green-500', icon: Wifi },
          { title: '离线设备', value: 1, color: 'text-red-500', icon: XCircle },
          { title: '执行任务数', value: 4, color: 'text-blue-500', icon: Settings },
        ].map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 设备列表 */}
      <div className="space-y-4">
        {devices.map((device) => (
          <Card key={device.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                    <Monitor className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{device.name}</h3>
                      <Badge variant="outline">{device.id}</Badge>
                      {device.status === 'online' ? (
                        <Badge className="bg-green-500">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          在线
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <XCircle className="mr-1 h-3 w-3" />
                          离线
                        </Badge>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Wifi className="h-3 w-3" />
                        {device.ip}
                      </span>
                      <span>•</span>
                      <span>{device.type}</span>
                      <span>•</span>
                      <span>插件版本: {device.pluginVersion}</span>
                      <span>•</span>
                      <span>最后活跃: {device.lastActive}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">执行任务</p>
                    <p className="text-lg font-bold">{device.tasks}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    {device.status === 'online' ? (
                      <Button variant="outline" size="sm">
                        <Power className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button size="sm">唤醒设备</Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 插件配置说明 */}
      <Card className="mt-6 border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/30 dark:to-blue-950/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
              <Download className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold">Chrome 插件配置</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                1. 下载并安装 Chrome 插件<br/>
                2. 在插件设置中输入设备ID和密钥<br/>
                3. 配置 Chrome 浏览器路径<br/>
                4. 确保设备在线后即可开始自动化任务
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
