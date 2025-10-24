import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  article: string;
  category: string;
  image: string;
  inStock: boolean;
}

export default function Index() {
  const [vinCode, setVinCode] = useState('');
  const [articleSearch, setArticleSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const products: Product[] = [
    {
      id: 1,
      name: 'Тормозные колодки',
      price: 2500,
      article: 'BRK-2024-01',
      category: 'Тормозная система',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400',
      inStock: true
    },
    {
      id: 2,
      name: 'Масляный фильтр',
      price: 450,
      article: 'FLT-2024-02',
      category: 'Фильтры',
      image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400',
      inStock: true
    },
    {
      id: 3,
      name: 'Свечи зажигания (комплект)',
      price: 1200,
      article: 'IGN-2024-03',
      category: 'Система зажигания',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400',
      inStock: true
    },
    {
      id: 4,
      name: 'Амортизатор передний',
      price: 4500,
      article: 'SUS-2024-04',
      category: 'Подвеска',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400',
      inStock: false
    },
    {
      id: 5,
      name: 'Аккумулятор 60Ah',
      price: 5500,
      article: 'BAT-2024-05',
      category: 'Электрика',
      image: 'https://images.unsplash.com/photo-1609348810024-5e6de6eab0c7?w=400',
      inStock: true
    },
    {
      id: 6,
      name: 'Ремень ГРМ',
      price: 1800,
      article: 'BLT-2024-06',
      category: 'Двигатель',
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400',
      inStock: true
    }
  ];

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleVinDecode = () => {
    if (vinCode.length === 17) {
      alert(`VIN-код ${vinCode} декодирован! Подбираем запчасти для вашего автомобиля...`);
    } else {
      alert('VIN-код должен содержать 17 символов');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted/30">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Icon name="Wrench" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-primary">AutoParts</span>
          </div>

          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => setActiveSection('home')}
              className={`text-sm font-medium transition-colors hover:text-accent ${activeSection === 'home' ? 'text-accent' : 'text-foreground'}`}
            >
              Главная
            </button>
            <button
              onClick={() => setActiveSection('catalog')}
              className={`text-sm font-medium transition-colors hover:text-accent ${activeSection === 'catalog' ? 'text-accent' : 'text-foreground'}`}
            >
              Каталог
            </button>
            <button
              onClick={() => setActiveSection('delivery')}
              className={`text-sm font-medium transition-colors hover:text-accent ${activeSection === 'delivery' ? 'text-accent' : 'text-foreground'}`}
            >
              Доставка
            </button>
            <button
              onClick={() => setActiveSection('payment')}
              className={`text-sm font-medium transition-colors hover:text-accent ${activeSection === 'payment' ? 'text-accent' : 'text-foreground'}`}
            >
              Оплата
            </button>
            <button
              onClick={() => setActiveSection('warranty')}
              className={`text-sm font-medium transition-colors hover:text-accent ${activeSection === 'warranty' ? 'text-accent' : 'text-foreground'}`}
            >
              Гарантии
            </button>
            <button
              onClick={() => setActiveSection('contacts')}
              className={`text-sm font-medium transition-colors hover:text-accent ${activeSection === 'contacts' ? 'text-accent' : 'text-foreground'}`}
            >
              Контакты
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-accent">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cartItemsCount === 0 ? 'Ваша корзина пуста' : `Товаров в корзине: ${cartItemsCount}`}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center border-b pb-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" size={14} />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Icon name="Trash2" size={18} />
                      </Button>
                    </div>
                  ))}
                </div>
                {cartItemsCount > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-background">
                    <div className="flex justify-between mb-4">
                      <span className="text-lg font-bold">Итого:</span>
                      <span className="text-lg font-bold text-accent">{totalPrice} ₽</span>
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      Оформить заказ
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        {activeSection === 'home' && (
          <>
            <section className="relative py-20 md:py-32 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-accent -skew-y-3 transform origin-top-left"></div>
              <div className="container relative z-10">
                <div className="max-w-3xl mx-auto text-center text-white animate-fade-in">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Оригинальные запчасти для вашего автомобиля
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-white/90">
                    Быстрый подбор по VIN-коду • Гарантия качества • Доставка по всей России
                  </p>
                  
                  <Card className="bg-white/95 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-primary">
                        <Icon name="Search" size={24} />
                        VIN-декодер
                      </CardTitle>
                      <CardDescription>Введите VIN-код для автоматического подбора запчастей</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Введите 17-значный VIN-код"
                          value={vinCode}
                          onChange={(e) => setVinCode(e.target.value.toUpperCase())}
                          maxLength={17}
                          className="text-lg"
                        />
                        <Button onClick={handleVinDecode} className="bg-accent hover:bg-accent/90 px-8">
                          Найти
                        </Button>
                      </div>
                      {vinCode.length > 0 && vinCode.length < 17 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Введено символов: {vinCode.length} из 17
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <section className="py-16 bg-white">
              <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div className="animate-fade-in">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Shield" size={32} className="text-accent" />
                    </div>
                    <h3 className="font-bold mb-2">Гарантия качества</h3>
                    <p className="text-sm text-muted-foreground">Только оригинальные запчасти</p>
                  </div>
                  <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Truck" size={32} className="text-accent" />
                    </div>
                    <h3 className="font-bold mb-2">Быстрая доставка</h3>
                    <p className="text-sm text-muted-foreground">По всей России за 1-3 дня</p>
                  </div>
                  <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="CreditCard" size={32} className="text-accent" />
                    </div>
                    <h3 className="font-bold mb-2">Удобная оплата</h3>
                    <p className="text-sm text-muted-foreground">Наличными или картой</p>
                  </div>
                  <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Headphones" size={32} className="text-accent" />
                    </div>
                    <h3 className="font-bold mb-2">Поддержка 24/7</h3>
                    <p className="text-sm text-muted-foreground">Всегда на связи</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === 'catalog' && (
          <section className="py-16">
            <div className="container">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Каталог запчастей</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Поиск по артикулу"
                      value={articleSearch}
                      onChange={(e) => setArticleSearch(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Icon name="Filter" size={18} />
                    Фильтры
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-8">
                  <TabsTrigger value="all">Все товары</TabsTrigger>
                  <TabsTrigger value="engine">Двигатель</TabsTrigger>
                  <TabsTrigger value="suspension">Подвеска</TabsTrigger>
                  <TabsTrigger value="brakes">Тормоза</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                          />
                          {!product.inStock && (
                            <Badge className="absolute top-2 right-2 bg-destructive">
                              Нет в наличии
                            </Badge>
                          )}
                          {product.inStock && (
                            <Badge className="absolute top-2 right-2 bg-green-500">
                              В наличии
                            </Badge>
                          )}
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{product.name}</CardTitle>
                              <CardDescription className="mt-1">
                                Артикул: {product.article}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Badge variant="outline">{product.category}</Badge>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-accent">{product.price} ₽</span>
                          <Button
                            onClick={() => addToCart(product)}
                            disabled={!product.inStock}
                            className="bg-accent hover:bg-accent/90"
                          >
                            <Icon name="ShoppingCart" size={18} className="mr-2" />
                            В корзину
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        )}

        {activeSection === 'delivery' && (
          <section className="py-16">
            <div className="container max-w-4xl">
              <h2 className="text-3xl font-bold mb-8">Доставка</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Truck" size={24} className="text-accent" />
                      Курьерская доставка
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2"><strong>Москва и МО:</strong> 1-2 дня, от 300 ₽</p>
                    <p><strong>Регионы:</strong> 2-5 дней, от 500 ₽</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Package" size={24} className="text-accent" />
                      Пункты выдачи
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Бесплатно при заказе от 3000 ₽. Более 5000 пунктов по всей России.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'payment' && (
          <section className="py-16">
            <div className="container max-w-4xl">
              <h2 className="text-3xl font-bold mb-8">Оплата</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="CreditCard" size={24} className="text-accent" />
                      Онлайн оплата
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Банковские карты Visa, MasterCard, МИР</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Wallet" size={24} className="text-accent" />
                      При получении
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Наличными или картой курьеру</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'warranty' && (
          <section className="py-16">
            <div className="container max-w-4xl">
              <h2 className="text-3xl font-bold mb-8">Гарантии</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Shield" size={24} className="text-accent" />
                    Гарантия качества
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>✓ Все запчасти — оригинальные, с сертификатами качества</p>
                  <p>✓ Гарантия от производителя — от 12 до 36 месяцев</p>
                  <p>✓ Возврат и обмен в течение 14 дней</p>
                  <p>✓ Бесплатная техническая консультация</p>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {activeSection === 'contacts' && (
          <section className="py-16">
            <div className="container max-w-4xl">
              <h2 className="text-3xl font-bold mb-8">Контакты</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Наши контакты</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" size={20} className="text-accent" />
                      <div>
                        <p className="font-medium">+7 (495) 123-45-67</p>
                        <p className="text-sm text-muted-foreground">Ежедневно 9:00 - 21:00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" size={20} className="text-accent" />
                      <div>
                        <p className="font-medium">info@autoparts.ru</p>
                        <p className="text-sm text-muted-foreground">Ответим в течение часа</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="MapPin" size={20} className="text-accent" />
                      <div>
                        <p className="font-medium">г. Москва, ул. Автомобильная, д. 1</p>
                        <p className="text-sm text-muted-foreground">Пн-Сб: 9:00 - 20:00</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Напишите нам</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <Input placeholder="Ваше имя" />
                      <Input type="email" placeholder="Email" />
                      <Input placeholder="Телефон" />
                      <Button className="w-full bg-accent hover:bg-accent/90">
                        Отправить
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t py-12 bg-secondary text-secondary-foreground">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Wrench" size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold">AutoParts</span>
              </div>
              <p className="text-sm text-secondary-foreground/80">
                Надежный поставщик автозапчастей с 2010 года
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setActiveSection('delivery')} className="hover:text-accent transition-colors">Доставка</button></li>
                <li><button onClick={() => setActiveSection('payment')} className="hover:text-accent transition-colors">Оплата</button></li>
                <li><button onClick={() => setActiveSection('warranty')} className="hover:text-accent transition-colors">Гарантии</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setActiveSection('catalog')} className="hover:text-accent transition-colors">Все товары</button></li>
                <li className="hover:text-accent transition-colors cursor-pointer">Популярное</li>
                <li className="hover:text-accent transition-colors cursor-pointer">Акции</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@autoparts.ru
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm text-secondary-foreground/60">
            <p>© 2024 AutoParts. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
