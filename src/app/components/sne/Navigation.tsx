import { useCallback, useEffect, useState } from 'react';
import { Menu, X, Activity, Shield, Key, FileText, Github } from 'lucide-react';
import { Button } from '../ui/button';

type Page = 'home' | 'dashboard' | 'products' | 'docs' | 'contracts';

interface NavigationProps {
  variant?: 'default' | 'dashboard';
  onNavigate?: (page: Page) => void;
  onConnectWallet?: () => void; // optional externally-provided connect handler
}

/**
 * Navigation (versão simplificada)
 * - links hash-aware / SPA-aware
 * - botão "Conectar Carteira" tenta apenas MetaMask (window.ethereum -> eth_requestAccounts)
 */

export function Navigation({ variant = 'default', onNavigate, onConnectWallet }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const siteLinks = [
    { label: 'Home', href: '/#home', page: 'home' as const },
    { label: 'Produtos', href: '/products', page: 'products' as const },
    { label: 'Documentação', href: '/docs', page: 'docs' as const },
  ];

  const dashboardLinks = [
    { label: 'Nós', href: '/dashboard#nodes', page: 'dashboard' as const, section: 'nodes', icon: Activity },
    { label: 'Vault', href: '/dashboard#vault', page: 'dashboard' as const, section: 'vault', icon: Shield },
    { label: 'Licenças', href: '/dashboard#licenses', page: 'dashboard' as const, section: 'licenses', icon: Key },
    { label: 'Logs', href: '/dashboard#logs', page: 'dashboard' as const, section: 'logs', icon: FileText },
  ];

  const links = variant === 'dashboard' ? dashboardLinks : siteLinks;

  const scrollToSectionIfPresent = useCallback((section?: string) => {
    if (!section) return;
    setTimeout(() => {
      const id = section.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        (el as HTMLElement).focus?.();
      }
    }, 180);
  }, []);

  const navigateTo = useCallback(
    (link: { href?: string; page?: Page; section?: string }) => {
      let href = '';
      if (link.href) href = link.href;
      else if (link.page) {
        const mapping: Record<Page, string> = {
          home: '/',
          products: '/products',
          docs: '/docs',
          contracts: '/contracts',
          dashboard: '/dashboard',
        };
        href = mapping[link.page] + (link.section ? `#${link.section}` : '');
      }

      try {
        window.history.pushState({}, '', href);
      } catch {
        window.location.href = href;
        return;
      }

      try {
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      } catch {
        window.dispatchEvent(new Event('hashchange'));
      }

      if (link.page && onNavigate) {
        onNavigate(link.page);
      }

      const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
      if ((pathname === '/dashboard' && link.page === 'dashboard') || pathname === '/docs' || pathname === '/') {
        if (link.section) scrollToSectionIfPresent(link.section);
      }
    },
    [onNavigate, scrollToSectionIfPresent]
  );

  const handleLinkClick = (e: React.MouseEvent, link: any) => {
    e.preventDefault();
    navigateTo(link);
    setMobileOpen(false);
  };

  // --- MetaMask connect (injected) ---
  const connectWithMetaMask = async () => {
    if (typeof window === 'undefined') throw new Error('Ambiente não suporta window');
    const anyWindow = window as any;
    if (!anyWindow.ethereum) {
      throw new Error('MetaMask não detectada (window.ethereum não disponível).');
    }
    // solicita permissões/accounts
    const accounts: string[] = await anyWindow.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
  };

  const handleConnect = async () => {
    // se o app provê um handler, dele use-o (integração com wagmi/web3modal)
    if (onConnectWallet) {
      onConnectWallet();
      return;
    }

    setConnecting(true);
    try {
      const accounts = await connectWithMetaMask();
      console.log('[Navigation] MetaMask connected', accounts);
      // ideal: propagar essa info (callback / context). Aqui apenas logamos.
    } catch (err: any) {
      console.error('[Navigation] connect error', err);
      // feedback simples ao usuário — troque por modal/snackbar se preferir
      // eslint-disable-next-line no-alert
      alert(`Erro ao conectar MetaMask: ${err?.message || String(err)}`);
    } finally {
      setConnecting(false);
    }
  };

  useEffect(() => {
    const onPop = () => setMobileOpen(false);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <nav role="navigation" aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)]" style={{ backgroundColor: 'var(--sne-bg)' }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
        <div className="flex items-center justify-between h-16">
          {/* Brand (text-only: SNE Labs) */}
          <a
            href="/"
            className="flex items-center gap-2 group"
            onClick={(e) => { e.preventDefault(); navigateTo({ page: 'home', href: '/' }); }}
            aria-label="SNE Labs - Home"
          >
            <span className="font-mono tracking-tight transition-colors" style={{ color: 'var(--sne-text-primary)', fontWeight: 700, fontSize: '1rem' }}>
              SNE Labs
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link: any) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="px-4 py-2 rounded transition-all duration-150 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ color: 'var(--sne-text-secondary)' }}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://github.com/SNE-Labs" target="_blank" rel="noopener noreferrer" className="p-2 rounded transition-colors" style={{ color: 'var(--sne-text-secondary)' }} aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>

            {variant === 'dashboard' ? (
              <Button onClick={handleConnect} className="rounded" style={{ backgroundColor: 'var(--sne-accent)', color: 'var(--sne-text-primary)', border: 'none' }}>
                {connecting ? 'Conectando...' : 'Conectar Carteira'}
              </Button>
            ) : (
              <Button onClick={() => navigateTo({ page: 'dashboard', href: '/dashboard' })} className="rounded" style={{ backgroundColor: 'var(--sne-surface-1)', color: 'var(--sne-text-primary)', border: '1px solid var(--border)' }}>
                Dashboard
              </Button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: 'var(--sne-text-primary)' }} aria-expanded={mobileOpen} aria-controls="sne-mobile-menu" aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div id="sne-mobile-menu" className="md:hidden py-4 border-t border-[var(--border)]">
            {links.map((link: any) => {
              const Icon = link.icon;
              return (
                <a key={link.href + link.label} href={link.href} onClick={(e) => { handleLinkClick(e, link); setMobileOpen(false); }} className="flex items-center gap-2 px-4 py-3 transition-colors" style={{ color: 'var(--sne-text-secondary)' }}>
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.label}
                </a>
              );
            })}
            <div className="mt-4 px-4">
              <Button onClick={() => { if (variant === 'dashboard') handleConnect(); else navigateTo({ page: 'dashboard', href: '/dashboard' }); setMobileOpen(false); }} className="w-full rounded" style={{ backgroundColor: 'var(--sne-accent)', color: 'var(--sne-text-primary)' }}>
                {variant === 'dashboard' ? (connecting ? 'Conectando...' : 'Conectar Carteira') : 'Dashboard'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
