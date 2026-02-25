'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Upload,
  Search,
  FileText,
  File,
  Trash2,
  Download,
  Tag,
  FolderOpen,
  CheckCircle2,
  Clock,
} from 'lucide-react';

const knowledgeFiles = [
  {
    id: 1,
    name: '华为Mate60产品说明书.pdf',
    type: 'PDF',
    size: '2.4 MB',
    tags: ['产品', 'Mate60'],
    status: 'processed',
    uploadTime: '2024-03-15',
  },
  {
    id: 2,
    name: '品牌故事.txt',
    type: 'TXT',
    size: '45 KB',
    tags: ['品牌', '故事'],
    status: 'processed',
    uploadTime: '2024-03-14',
  },
  {
    id: 3,
    name: '技术白皮书.docx',
    type: 'Word',
    size: '1.2 MB',
    tags: ['技术', '白皮书'],
    status: 'processing',
    uploadTime: '2024-03-15',
  },
  {
    id: 4,
    name: '用户手册.pdf',
    type: 'PDF',
    size: '3.8 MB',
    tags: ['用户', '手册'],
    status: 'processed',
    uploadTime: '2024-03-13',
  },
];

export default function LibraryPage() {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">知识库管理</h1>
          <p className="text-sm text-muted-foreground">
            上传企业物料，为AI生成内容提供知识基础，避免"幻觉"
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsUploading(true)}>
          <Upload className="h-4 w-4" />
          上传资料
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 左侧：统计信息 */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">知识库统计</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">文件总数</span>
                <span className="font-bold">128</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">总大小</span>
                <span className="font-bold">256 MB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">已处理</span>
                <span className="font-bold text-green-500">124</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">处理中</span>
                <span className="font-bold text-blue-500">4</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">存储空间</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">已使用</span>
                  <span className="font-medium">256 MB / 1 GB</span>
                </div>
                <Progress value={25} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  剩余 744 MB 可用空间
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">支持格式</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">.txt</Badge>
                <Badge variant="outline">.pdf</Badge>
                <Badge variant="outline">.doc</Badge>
                <Badge variant="outline">.docx</Badge>
                <Badge variant="outline">.md</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：文件列表 */}
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>文件列表</CardTitle>
                <CardDescription>管理已上传的知识文件</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="搜索文件..." className="pl-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="processed">已处理</TabsTrigger>
                <TabsTrigger value="processing">处理中</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-3">
                {knowledgeFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        {file.type === 'PDF' ? (
                          <FileText className="h-5 w-5 text-red-500" />
                        ) : file.type === 'TXT' ? (
                          <File className="h-5 w-5 text-blue-500" />
                        ) : (
                          <FileText className="h-5 w-5 text-purple-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{file.type}</span>
                          <span>•</span>
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>{file.uploadTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {file.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {file.status === 'processed' ? (
                        <Badge className="bg-green-500">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          已处理
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <Clock className="mr-1 h-3 w-3" />
                          处理中
                        </Badge>
                      )}
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
