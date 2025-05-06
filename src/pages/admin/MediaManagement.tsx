
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Trash, Image as ImageIcon, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock media data
const mockMedia = [
  {
    id: '1',
    name: 'cow-milk.jpg',
    url: '/assets/cow-milk.jpg',
    type: 'image',
    size: '250KB',
    uploadedOn: '2024-01-15',
  },
  {
    id: '2',
    name: 'buffalo-milk.jpg',
    url: '/assets/buffalo-milk.jpg',
    type: 'image',
    size: '320KB',
    uploadedOn: '2024-01-20',
  },
  {
    id: '3',
    name: 'banner-1.jpg',
    url: '/assets/banner-1.jpg',
    type: 'image',
    size: '450KB',
    uploadedOn: '2024-02-05',
  },
  {
    id: '4',
    name: 'logo.png',
    url: '/assets/logo.png',
    type: 'image',
    size: '120KB',
    uploadedOn: '2023-12-10',
  }
];

const MediaManagement = () => {
  const [media, setMedia] = useState(mockMedia);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadName, setUploadName] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  
  const filteredMedia = media.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDeleteMedia = (id: string) => {
    setMedia(media.filter(item => item.id !== id));
    toast.success('Media deleted successfully');
  };
  
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };
  
  const handleUploadMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadName || !uploadUrl) {
      toast.error('Please provide both name and URL');
      return;
    }
    
    const newMedia = {
      id: Date.now().toString(),
      name: uploadName,
      url: uploadUrl,
      type: 'image',
      size: 'Unknown',
      uploadedOn: new Date().toISOString().split('T')[0],
    };
    
    setMedia([...media, newMedia]);
    setUploadName('');
    setUploadUrl('');
    toast.success('Media uploaded successfully');
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Media Management</h1>
      
      <Tabs defaultValue="library" className="mb-6">
        <TabsList>
          <TabsTrigger value="library">Media Library</TabsTrigger>
          <TabsTrigger value="upload">Upload New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="library" className="space-y-4">
          <div className="flex justify-between items-center">
            <Input
              placeholder="Search media files..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className="text-sm text-sage-500">{filteredMedia.length} items</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMedia.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="h-32 bg-gray-100 flex items-center justify-center">
                  {item.type === 'image' ? (
                    <img 
                      src={item.url} 
                      alt={item.name} 
                      className="w-full h-full object-contain" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  ) : (
                    <ImageIcon className="h-10 w-10 text-gray-300" />
                  )}
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium truncate mb-1">{item.name}</p>
                  <div className="flex justify-between text-xs text-sage-500">
                    <span>{item.size}</span>
                    <span>{item.uploadedOn}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 h-8"
                      onClick={() => handleCopyUrl(item.url)}
                    >
                      <Copy className="h-3 w-3 mr-1" /> URL
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="flex-1 h-8"
                      onClick={() => handleDeleteMedia(item.id)}
                    >
                      <Trash className="h-3 w-3 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upload">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleUploadMedia} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file-name">File Name</Label>
                  <Input 
                    id="file-name" 
                    value={uploadName}
                    onChange={(e) => setUploadName(e.target.value)}
                    placeholder="Enter file name with extension (e.g., image.jpg)"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="file-url">File URL</Label>
                  <Input 
                    id="file-url" 
                    value={uploadUrl}
                    onChange={(e) => setUploadUrl(e.target.value)}
                    placeholder="Enter URL to image (e.g., https://example.com/image.jpg)"
                    required
                  />
                </div>
                
                {uploadUrl && (
                  <div className="mt-2 h-32 w-full bg-gray-50 rounded-md flex items-center justify-center overflow-hidden border">
                    <img 
                      src={uploadUrl} 
                      alt="Preview" 
                      className="max-h-full max-w-full object-contain" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                )}
                
                <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700">
                  <Upload className="mr-2 h-4 w-4" /> Upload Media
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MediaManagement;
