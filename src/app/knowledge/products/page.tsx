'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Package,
  Tag,
  FileText,
  Eye,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const products = [
  {
    id: 1,
    name: '华为Mate60 Pro',
    category: '智能手机',
    description: '旗舰商务手机，支持卫星通话',
    keywords: ['商务手机', '卫星通话', '旗舰机'],
    materials: 12,
    status: 'active',
  },
  {
    id: 2,
    name: '华为MatePad Pro',
    category: '平板电脑',
    description: '专业办公平板，多屏协同',
    keywords: ['办公平板', '多屏协同', '生产力'],
    materials: 8,
    status: 'active',
  },
  {
    id: 3,
    name: '华为Watch GT4',
    category: '智能手表',
    description: '运动健康监测，超长续航',
    keywords: ['智能手表', '运动健康', '续航'],
    materials: 5,
    status: 'draft',
  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">产品管理</h1>
          <p className="text-sm text-muted-foreground">
            管理您的产品信息，为AI内容生成提供知识基础
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 cursor-pointer">
              <Plus className="h-4 w-4" />
              添加产品
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>添加新产品</DialogTitle>
              <DialogDescription>
                填写产品信息，系统将基于此生成精准内容
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>产品名称</Label>
                  <Input placeholder="如：华为Mate60 Pro" />
                </div>
                <div className="space-y-2">
                  <Label>产品类别</Label>
                  <Input placeholder="如：智能手机" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>产品描述</Label>
                <Textarea placeholder="简要描述产品核心卖点..." rows={3} />
              </div>
              <div className="space-y-2">
                <Label>核心关键词</Label>
                <Input placeholder="用逗号分隔，如：商务手机,卫星通话,旗舰机" />
              </div>
              <div className="space-y-2">
                <Label>上传产品资料</Label>
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-6">
                  <div className="text-center">
                    <Package className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      支持 TXT、PDF、Word 格式
                    </p>
                    <Button variant="secondary" size="sm" className="mt-3">
                      选择文件
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">取消</Button>
              <Button>保存产品</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 搜索和筛选 */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索产品名称、关键词..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">筛选</Button>
          </div>
        </CardContent>
      </Card>

      {/* 产品列表 */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>产品名称</TableHead>
              <TableHead>类别</TableHead>
              <TableHead>核心关键词</TableHead>
              <TableHead>素材数量</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{product.category}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {product.keywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{product.materials}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={product.status === 'active' ? 'default' : 'secondary'}
                    className={product.status === 'active' ? 'bg-green-500' : ''}
                  >
                    {product.status === 'active' ? '已激活' : '草稿'}
                  </Badge>
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
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        编辑
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        删除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
