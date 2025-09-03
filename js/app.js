// FengWei Pai 管理后台系统 - 主应用文件
// 迁移自 index.html 的全部 React 组件和功能

// 1. 从配置文件读取配置
const SUPABASE_URL = window.AppConfig?.SUPABASE_URL || 'https://edfnhhthztskuuosuasw.supabase.co';
const SUPABASE_ANON_KEY = window.AppConfig?.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZm5oaHRoenRza3V1b3N1YXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTYxMTYsImV4cCI6MjA2NTU3MjExNn0.O3g2gjvsWagmWgmzoeJA8mPampvLYJr-KgqVwXsKoAo';
const WHATSAPP_NUMBER = window.AppConfig?.WHATSAPP_NUMBER || '60162327792';
const ADMIN_PASSWORD = window.AppConfig?.ADMIN_PASSWORD || 'fengweipaiadmin';
const SELF_PICKUP_ADDRESS = window.AppConfig?.SELF_PICKUP_ADDRESS || `667, Jalan 24, Taman Perindustrian Ehsan Jaya, Kepong, 52100, Kuala Lumpur.`;
const PRODUCT_IMAGE_BASE_URL = window.AppConfig?.PRODUCT_IMAGE_BASE_URL || 'https://edfnhhthztskuuosuasw.supabase.co/storage/v1/object/public/product-photos/';

// 避免与全局 supabase UMD 对象同名遮蔽，显式引用 window.supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// 为了向后兼容，也创建 supabase 别名
const supabase = supabaseClient;

// 解构 React Hooks 供后续直接使用
const { useState, useEffect, useCallback, useRef, useMemo } = React;

// 主应用组件
function App() {
  const [currentView, setCurrentView] = useState('customer');
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastOrder, setLastOrder] = useState(null);
  
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };
  
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabaseClient
      .from('products')
      .select('*')
      .eq('is_published', true)
      .order('id');
      
    if (error) {
      showToast('加载商品失败: ' + error.message, 'danger');
      setProducts([]);
    } else {
      const formattedProducts = data.map(p => {
        let imgUrl = '';
        if (p.image_url) {
          imgUrl = p.image_url;
        } else if (p.image) {
          const rawName = String(p.image).trim();
          imgUrl = rawName.startsWith('http') ? rawName : 
            ('https://edfnhhthztskuuosuasw.supabase.co/storage/v1/object/public/product-photos/' + encodeURIComponent(rawName));
        }
        return {
          ...p,
          image: imgUrl,
          stock: p.stock_quantity ?? 0,
          minStock: p.min_stock_threshold ?? 5
        };
      });
      setProducts(formattedProducts);
    }
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  return React.createElement('div', { className: 'min-h-screen bg-gray-50' },
    React.createElement('div', { className: 'container mx-auto px-4 py-8' },
      React.createElement('div', { className: 'text-center' },
        React.createElement('h1', { className: 'text-4xl font-bold text-gray-900 mb-4' }, '🍽️ 锋味派美食团购'),
        React.createElement('p', { className: 'text-xl text-gray-600 mb-8' }, '欢迎来到锋味派美食团购系统'),
        React.createElement('div', { className: 'grid md:grid-cols-2 gap-8 max-w-4xl mx-auto' },
          React.createElement('div', { className: 'bg-white p-8 rounded-lg shadow-lg' },
            React.createElement('h2', { className: 'text-2xl font-bold mb-4 text-red-600' }, '📞 联系我们'),
            React.createElement('div', { className: 'space-y-3' },
              React.createElement('div', null,
                React.createElement('strong', null, 'WhatsApp: '),
                '0162327792'
              ),
              React.createElement('div', null,
                React.createElement('strong', null, '自取地址: '),
                React.createElement('br', null),
                '667, Jalan 24, Taman Perindustrian Ehsan Jaya,',
                React.createElement('br', null),
                'Kepong, 52100, Kuala Lumpur.'
              )
            ),
            React.createElement('div', { className: 'mt-6' },
              React.createElement('a', {
                href: 'https://wa.me/60162327792?text=您好，我想订购锋味派美食',
                className: 'bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors inline-block'
              }, 'WhatsApp 订购')
            )
          ),
          React.createElement('div', { className: 'bg-white p-8 rounded-lg shadow-lg' },
            React.createElement('h2', { className: 'text-2xl font-bold mb-4 text-blue-600' }, '🛍️ 系统功能'),
            React.createElement('ul', { className: 'space-y-2 text-left' },
              React.createElement('li', null, '✅ 在线商品浏览'),
              React.createElement('li', null, '✅ 购物车功能'),
              React.createElement('li', null, '✅ 订单管理'),
              React.createElement('li', null, '✅ 库存管理'),
              React.createElement('li', null, '✅ 会员系统'),
              React.createElement('li', null, '✅ 数据分析')
            ),
            React.createElement('div', { className: 'mt-6' },
              React.createElement('button', {
                className: 'bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors',
                onClick: () => setCurrentView('login')
              }, '管理员登录')
            )
          )
        )
      )
    )
  );
}

// 初始化应用
function initializeApp() {
  console.log('Initializing FengWei Pai application...');
  ReactDOM.render(React.createElement(App), document.getElementById('root'));
}

// 应用加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}