'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Play,
  Pause,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  MoreHorizontal,
  Eye,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const tasks = [
  {
    id: 1,
    name: '华为Mate60软文发布任务',
    articles: 15,
    platforms: ['知乎', '小红书', '微信公众号'],
    status: 'running',
    progress: 67,
    completed: 10,
    startTime: '2024-03-15 10:30',
    device: 'SUK-WIN-001',
  },
  {
    id: 2,
    name: '新品发布预热内容',
    articles: 8,
    platforms: ['微博', '今日头条'],
    status: 'completed',
    progress: 100,
    completed: 8,
    startTime: '2024-03-14 09:00',
    device: 'SUK-WIN-002',
  },
  {
    id: 3,
    name: '品牌故事系列发布',
    articles: 12,
    platforms: ['知乎', '小红书'],
    status: 'paused',
    progress: 25,
    completed: 3,
    startTime: '2024-03-15 14:00',
    device: 'SUK-WIN-001',
  },
  {
    id: 4,
    name: '技术白皮书解读',
    articles: 5,
    platforms: ['微信公众号'],
    status: 'pending',
    progress: 0,
    completed: 0,
    startTime: '-',
    device: '-',
  },
  {
    id: 5,
    name: '用户故事征集发布',
    articles: 20,
    platforms: ['小红书', '微博'],
    status: 'error',
    progress: 45,
    completed: 9,
    startTime: '2024-03-15 16:00',
    device: 'SUK-WIN-002',
  },
];

export default function TasksPage() {
  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">发布任务</h1>
          <p className="text-sm text-muted-foreground">
            配合浏览器插件或本地客户端，执行自动发布任务
          </p>
        </div>
        <Button className="gap-2">
          <Zap className="h-4 w-4" />
          创建任务
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        {[
          { title: '进行中', value: 1, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
          { title: '已完成', value: 12, color: 'text-green-500', bgColor: 'bg-green-500/10' },
          { title: '已暂停', value: 1, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
          { title: '异常', value: 1, color: 'text-red-500', bgColor: 'bg-red-500/10' },
        ].map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                  <Zap className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 任务列表 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>任务列表</CardTitle>
              <CardDescription>管理和监控自动化发布任务</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="running">进行中</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                  <SelectItem value="paused">已暂停</SelectItem>
                  <SelectItem value="error">异常</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                刷新
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>任务名称</TableHead>
                <TableHead>文章数</TableHead>
                <TableHead>发布平台</TableHead>
                <TableHead>执行设备</TableHead>
                <TableHead>进度</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{task.name}</p>
                      <p className="text-xs text-muted-foreground">
                        开始时间：{task.startTime}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{task.completed}</span>
                    <span className="text-muted-foreground">/{task.articles}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {task.platforms.map((p) => (
                        <Badge key={p} variant="outline" className="text-xs">
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {task.device !== '-' ? (
                      <Badge variant="secondary">{task.device}</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={task.progress} className="w-20 h-1.5" />
                      <span className="text-xs">{task.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {task.status === 'running' && (
                      <Badge className="bg-blue-500">
                        <Play className="mr-1 h-3 w-3" />
                        进行中
                      </Badge>
                    )}
                    {task.status === 'completed' && (
                      <Badge className="bg-green-500">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        已完成
                      </Badge>
                    )}
                    {task.status === 'paused' && (
                      <Badge variant="secondary">
                        <Pause className="mr-1 h-3 w-3" />
                        已暂停
                      </Badge>
                    )}
                    {task.status === 'pending' && (
                      <Badge variant="outline">
                        <Clock className="mr-1 h-3 w-3" />
                        待执行
                      </Badge>
                    )}
                    {task.status === 'error' && (
                      <Badge variant="destructive">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        异常
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          查看详情
                        </DropdownMenuItem>
                        {task.status === 'running' && (
                          <DropdownMenuItem>
                            <Pause className="mr-2 h-4 w-4" />
                            暂停任务
                          </DropdownMenuItem>
                        )}
                        {(task.status === 'paused' || task.status === 'pending') && (
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            启动任务
                          </DropdownMenuItem>
                        )}
                        {task.status === 'error' && (
                          <DropdownMenuItem>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            重试任务
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除任务
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 设备提示 */}
      <Card className="mt-6 border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/30 dark:to-blue-950/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
              <Zap className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold">自动化发布说明</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                系统通过本地设备（安装Chrome插件）执行自动化发布，使用真实浏览器环境，
                确保发布成功率。请保持设备在线，并定期检查授权状态。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
