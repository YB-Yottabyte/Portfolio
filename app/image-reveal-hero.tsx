"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function ImageRevealHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navDocked, setNavDocked] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const cardFrameRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const crosshairRef = useRef<HTMLSpanElement>(null);
  const coordinateRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const card = cardRef.current;
    const cardFrame = cardFrameRef.current;
    const reveal = revealRef.current;
    const crosshair = crosshairRef.current;
    const coordinate = coordinateRef.current;

    if (!hero || !card || !cardFrame || !reveal || !crosshair || !coordinate) return;

    const interactionQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 48.001rem)",
    );
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let frameId = 0;
    let pointerInside = false;
    let current = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };
    let lastPointer = { x: 0, y: 0 };

    const context = gsap.context(() => {
      const stopMovement = () => {
        if (frameId) cancelAnimationFrame(frameId);
        frameId = 0;
      };

      const render = () => {
        gsap.set(card, { x: current.x, y: current.y });
        const heroRect = hero.getBoundingClientRect();
        const frameRect = cardFrame.getBoundingClientRect();
        const top = Math.max(0, frameRect.top - heroRect.top);
        const right = Math.max(0, heroRect.right - frameRect.right);
        const bottom = Math.max(0, heroRect.bottom - frameRect.bottom);
        const left = Math.max(0, frameRect.left - heroRect.left);
        const clip = `inset(${top}px ${right}px ${bottom}px ${left}px)`;

        reveal.style.clipPath = clip;
        reveal.style.setProperty("-webkit-clip-path", clip);
      };

      const updateCrosshair = (clientX: number, clientY: number) => {
        const heroRect = hero.getBoundingClientRect();
        gsap.set(crosshair, {
          x: clientX - heroRect.left,
          y: clientY - heroRect.top,
          xPercent: -50,
          yPercent: -50,
        });
      };

      const updateCoordinates = (clientX: number, clientY: number) => {
        const heroRect = hero.getBoundingClientRect();
        const x = Math.min(
          100,
          Math.max(0, ((clientX - heroRect.left) / heroRect.width) * 100),
        );
        const y = Math.min(
          100,
          Math.max(0, ((clientY - heroRect.top) / heroRect.height) * 100),
        );

        coordinate.textContent = `X ${x.toFixed(1).padStart(5, "0")} · Y ${y
          .toFixed(1)
          .padStart(5, "0")}`;
      };

      const isInteractiveTarget = (targetElement: EventTarget | null) =>
        targetElement instanceof Element &&
        Boolean(targetElement.closest("a, button, [role='button']"));

      const getPosition = (clientX: number, clientY: number) => {
        const heroRect = hero.getBoundingClientRect();
        const cardWidth = card.offsetWidth;
        const cardHeight = card.offsetHeight;
        const pointerX = clientX - heroRect.left;
        const pointerY = clientY - heroRect.top;
        const visibleLeft = Math.max(0, -heroRect.left);
        const visibleTop = Math.max(0, -heroRect.top);
        const visibleRight = Math.min(
          heroRect.width,
          window.innerWidth - heroRect.left,
        );
        const visibleBottom = Math.min(
          heroRect.height,
          window.innerHeight - heroRect.top,
        );

        const x = pointerX - cardWidth / 2;
        const y = pointerY - cardHeight / 2;

        return {
          x: Math.min(
            Math.max(x, visibleLeft),
            Math.max(visibleLeft, visibleRight - cardWidth),
          ),
          y: Math.min(
            Math.max(y, visibleTop),
            Math.max(visibleTop, visibleBottom - cardHeight),
          ),
        };
      };

      const tick = () => {
        const deltaX = target.x - current.x;
        const deltaY = target.y - current.y;

        if (Math.abs(deltaX) < 0.1 && Math.abs(deltaY) < 0.1) {
          current = { ...target };
          render();
          frameId = 0;
          return;
        }

        current.x += deltaX * 0.16;
        current.y += deltaY * 0.16;
        render();
        frameId = requestAnimationFrame(tick);
      };

      const startMovement = () => {
        if (frameId || reducedMotionQuery.matches) return;
        frameId = requestAnimationFrame(tick);
      };

      const hideCard = (immediate = false) => {
        pointerInside = false;
        stopMovement();
        hero.removeAttribute("data-crosshair-active");
        gsap.killTweensOf([card, reveal, crosshair]);

        if (immediate) {
          gsap.set(card, { autoAlpha: 0, scale: 1 });
          gsap.set(reveal, { autoAlpha: 0 });
          gsap.set(crosshair, { autoAlpha: 0, scale: 1 });
          card.style.removeProperty("will-change");
          crosshair.style.removeProperty("will-change");
          return;
        }

        gsap.to(card, {
          autoAlpha: 0,
          scale: reducedMotionQuery.matches ? 1 : 0.97,
          duration: 0.2,
          ease: "power2.out",
          onComplete: () => card.style.removeProperty("will-change"),
        });
        gsap.to(reveal, {
          autoAlpha: 0,
          duration: 0.2,
          ease: "power2.out",
        });
        gsap.to(crosshair, {
          autoAlpha: 0,
          scale: reducedMotionQuery.matches ? 1 : 0.82,
          duration: 0.14,
          ease: "power2.out",
          onComplete: () => crosshair.style.removeProperty("will-change"),
        });
      };

      const showCard = (clientX: number, clientY: number) => {
        if (!interactionQuery.matches) return;

        lastPointer = { x: clientX, y: clientY };
        updateCrosshair(clientX, clientY);
        updateCoordinates(clientX, clientY);
        current = getPosition(clientX, clientY);
        target = { ...current };
        pointerInside = true;
        stopMovement();
        hero.setAttribute("data-crosshair-active", "true");
        gsap.killTweensOf([card, reveal, crosshair]);
        render();
        card.style.willChange = "transform, opacity";
        crosshair.style.willChange = "transform, opacity";
        gsap.fromTo(
          card,
          {
            autoAlpha: 0,
            scale: reducedMotionQuery.matches ? 1 : 0.96,
          },
          {
            autoAlpha: 1,
            scale: 1,
            duration: reducedMotionQuery.matches ? 0.16 : 0.26,
            ease: "power2.out",
          },
        );
        gsap.set(reveal, { autoAlpha: 1 });
        gsap.fromTo(
          crosshair,
          {
            autoAlpha: 0,
            scale: reducedMotionQuery.matches ? 1 : 0.72,
          },
          {
            autoAlpha: 1,
            scale: 1,
            duration: reducedMotionQuery.matches ? 0.12 : 0.2,
            ease: "power2.out",
          },
        );
      };

      const handlePointerEnter = (event: PointerEvent) => {
        if (isInteractiveTarget(event.target)) return;
        showCard(event.clientX, event.clientY);
      };

      const handlePointerMove = (event: PointerEvent) => {
        if (!interactionQuery.matches) return;
        if (isInteractiveTarget(event.target)) {
          if (pointerInside) hideCard();
          return;
        }

        lastPointer = { x: event.clientX, y: event.clientY };

        if (!pointerInside) {
          showCard(event.clientX, event.clientY);
          return;
        }

        updateCrosshair(event.clientX, event.clientY);
        updateCoordinates(event.clientX, event.clientY);
        if (reducedMotionQuery.matches) return;
        target = getPosition(event.clientX, event.clientY);
        startMovement();
      };

      const handlePointerLeave = () => hideCard();
      const handlePointerCancel = () => hideCard();
      const handleWindowBlur = () => hideCard(true);
      const handleInteractionChange = () => hideCard(true);
      const handleResize = () => {
        if (!pointerInside || !interactionQuery.matches) {
          hideCard(true);
          return;
        }

        target = getPosition(lastPointer.x, lastPointer.y);
        if (reducedMotionQuery.matches) {
          current = { ...target };
          render();
        } else {
          startMovement();
        }
      };
      const handleVisibilityChange = () => {
        if (document.hidden) hideCard(true);
      };

      gsap.set([card, crosshair], { autoAlpha: 0, scale: 1 });
      gsap.set(reveal, { autoAlpha: 0 });
      hero.addEventListener("pointerenter", handlePointerEnter);
      hero.addEventListener("pointermove", handlePointerMove);
      hero.addEventListener("pointerleave", handlePointerLeave);
      hero.addEventListener("pointercancel", handlePointerCancel);
      window.addEventListener("blur", handleWindowBlur);
      window.addEventListener("resize", handleResize, { passive: true });
      document.addEventListener("visibilitychange", handleVisibilityChange);
      interactionQuery.addEventListener("change", handleInteractionChange);
      reducedMotionQuery.addEventListener("change", handleInteractionChange);

      return () => {
        stopMovement();
        gsap.killTweensOf([card, reveal, crosshair]);
        hero.removeAttribute("data-crosshair-active");
        hero.removeEventListener("pointerenter", handlePointerEnter);
        hero.removeEventListener("pointermove", handlePointerMove);
        hero.removeEventListener("pointerleave", handlePointerLeave);
        hero.removeEventListener("pointercancel", handlePointerCancel);
        window.removeEventListener("blur", handleWindowBlur);
        window.removeEventListener("resize", handleResize);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        interactionQuery.removeEventListener("change", handleInteractionChange);
        reducedMotionQuery.removeEventListener("change", handleInteractionChange);
        card.style.removeProperty("will-change");
        reveal.style.removeProperty("clip-path");
        reveal.style.removeProperty("-webkit-clip-path");
        crosshair.style.removeProperty("will-change");
      };
    }, hero);

    return () => context.revert();
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateDockedState = () => {
      frameId = 0;
      const threshold = Math.min(window.innerHeight * 0.32, 320);
      setNavDocked(window.scrollY > threshold);
    };

    const handleScroll = () => {
      if (!frameId) frameId = requestAnimationFrame(updateDockedState);
    };

    updateDockedState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero"
      aria-labelledby="intro-title"
    >
      <div className="hero__media" aria-hidden="true">
        <Image
          className="hero__image hero__image--blurred"
          src="/image.png?hero=20260714"
          alt=""
          width={3000}
          height={2064}
          preload
          unoptimized
          sizes="100vw"
        />
        <div ref={revealRef} className="hero__reveal-clip">
          <Image
            className="hero__image hero__image--reveal"
            src="/image.png?hero=20260714"
            alt=""
            width={3000}
            height={2064}
            loading="eager"
            unoptimized
            sizes="100vw"
          />
        </div>
        <div className="hero__tint" />
        <div className="hero__dither" />
        <div className="hero__shade" />
      </div>

      <header
        className="hero__topbar"
        data-open={menuOpen}
        data-docked={navDocked}
      >
        <a className="hero__logo" href="#main-content" aria-label="Home">
          SR
        </a>

        <nav className="hero__nav" aria-label="Primary">
          <a className="hero__nav-logo" href="#hero" aria-label="Back to top">
            SR
          </a>
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="hero__cta" href="#main-content">
          Résumé
        </a>

        <button
          type="button"
          className="hero__menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="hero-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">
            {menuOpen ? "Close menu" : "Open menu"}
          </span>
          <span className="hero__menu-icon" aria-hidden="true" />
        </button>
      </header>

      <div id="hero-menu" className="hero__menu" data-open={menuOpen}>
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#main-content" onClick={() => setMenuOpen(false)}>
          Résumé
        </a>
      </div>

      <figure
        ref={cardRef}
        className="hero__card"
        style={{ width: "clamp(32rem, 36vw, 40rem)" }}
        aria-hidden="true"
      >
        <div
          ref={cardFrameRef}
          className="hero__card-frame"
          style={{ aspectRatio: "4 / 3" }}
        >
          <span ref={coordinateRef} className="hero__card-coord">
            Focus view · 4:3
          </span>
          <span className="hero__card-corner hero__card-corner--tl" />
          <span className="hero__card-corner hero__card-corner--tr" />
          <span className="hero__card-corner hero__card-corner--bl" />
          <span className="hero__card-corner hero__card-corner--br" />
        </div>
      </figure>

      <span ref={crosshairRef} className="hero__crosshair" aria-hidden="true" />

      <div className="site-container hero__content">
        <p className="eyebrow">Computer Vision · AI · Full Stack</p>
        <h1 id="intro-title" className="hero__title">
          Sai Rithwik
          <span>Kukunuri</span>
        </h1>
        <p className="hero__meta">
          Building systems that understand the visual world
        </p>
      </div>

      <a className="hero__scroll-cue" href="#about">
        <span>Scroll to explore</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
