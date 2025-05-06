
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash, Image as ImageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { toast } from 'sonner';

// Mock data for products
const mockProducts = [
  {
    id: '1',
    name: 'Fresh Cow Milk',
    description: 'Pure and fresh cow milk delivered daily',
    price: 45,
    image: '/assets/cow-milk.jpg',
    category: 'Milk',
  },
  {
    id: '2',
    name: 'Buffalo Milk',
    description: 'Rich and creamy buffalo milk with high fat content',
    price: 60,
    image: '/assets/buffalo-milk.jpg',
    category: 'Milk',
  },
  {
    id: '3',
    name: 'Low-Fat Milk',
    description: 'Low-fat milk option for health-conscious customers',
    price: 50,
    image: '/assets/low-fat-milk.jpg',
    category: 'Milk',
  },
];

const ProductManagement = () => {
  const [products, setProducts] = useState(mockProducts);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  const handleAddProduct = (product: any) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts([...products, newProduct]);
    toast.success('Product added successfully');
    setIsAddProductOpen(false);
  };
  
  const handleEditProduct = (product: any) => {
    setProducts(products.map(p => p.id === product.id ? product : p));
    toast.success('Product updated successfully');
    setEditingProduct(null);
  };
  
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted successfully');
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button className="bg-sage-600 hover:bg-sage-700">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm onSubmit={handleAddProduct} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="h-48 bg-gray-100 relative">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-300" />
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-sage-500">{product.category}</p>
                </div>
                <p className="text-lg font-bold">₹{product.price}</p>
              </div>
              <p className="text-sm mb-4 text-gray-600 line-clamp-2">{product.description}</p>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setEditingProduct(product)}
                    >
                      <Edit className="mr-1 h-4 w-4" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                    </DialogHeader>
                    {editingProduct && (
                      <ProductForm 
                        product={editingProduct} 
                        onSubmit={handleEditProduct} 
                      />
                    )}
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <Trash className="mr-1 h-4 w-4" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

interface ProductFormProps {
  product?: any;
  onSubmit: (product: any) => void;
}

const ProductForm = ({ product, onSubmit }: ProductFormProps) => {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price || '');
  const [category, setCategory] = useState(product?.category || '');
  const [imageUrl, setImageUrl] = useState(product?.image || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: product?.id,
      name,
      description,
      price: Number(price),
      category,
      image: imageUrl,
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹)</Label>
          <Input 
            id="price" 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input 
            id="category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input 
          id="image" 
          value={imageUrl} 
          onChange={(e) => setImageUrl(e.target.value)} 
        />
        {imageUrl && (
          <div className="mt-2 h-32 w-full bg-gray-100 rounded-md overflow-hidden">
            <img 
              src={imageUrl} 
              alt="Product preview" 
              className="w-full h-full object-contain" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>
        )}
      </div>
      
      <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700">
        {product ? 'Update Product' : 'Add Product'}
      </Button>
    </form>
  );
};

export default ProductManagement;
