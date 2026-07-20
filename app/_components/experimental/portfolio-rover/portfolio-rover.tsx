"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import styles from "./portfolio-rover.module.css";

type Direction = "forward" | "backward";
type Controls = Record<Direction, boolean>;
type RouteGeometry = {
  width: number;
  height: number;
  path: string;
  startY: number;
  endY: number;
};

const EMPTY_CONTROLS: Controls = {
  forward: false,
  backward: false,
};

export function PortfolioRover() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const routePathRef = useRef<SVGPathElement>(null);
  const vehicleStageRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<Controls>({ ...EMPTY_CONTROLS });
  const routeTurnRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [route, setRoute] = useState<RouteGeometry>({
    width: 1,
    height: 1,
    path: "M 0 0 L 0 1",
    startY: 0,
    endY: 1,
  });

  useEffect(() => {
    let frameId = 0;

    const buildRoute = () => {
      frameId = 0;
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.scrollHeight;
      const mobile = width < 768;
      const carWidth = mobile ? 92 : Math.min(120, Math.max(100, width * 0.075));
      const carHeight = mobile ? 77 : Math.min(102, Math.max(83, width * 0.064));
      const edgeX = width - carWidth / 2 - (mobile ? 5 : 18);
      const headingIds = [
        "about-title",
        "experience-title",
        "projects-title",
        "skills-title",
        "contact-title",
      ];

      const headingPoints = headingIds.flatMap((id) => {
        const heading = document.getElementById(id);
        if (!heading) return [];
        const headingBounds = heading.getBoundingClientRect();

        return [
          {
            x: Math.min(edgeX, headingBounds.right + carWidth / 2 + 26),
            y:
              headingBounds.top +
              window.scrollY +
              headingBounds.height * 0.52,
          },
        ];
      });

      if (headingPoints.length === 0) return;

      const obstacleSelector = [
        "main section:not(#intro) img",
        "main section:not(#intro) h1",
        "main section:not(#intro) h2",
        "main section:not(#intro) h3",
        "main section:not(#intro) p",
        "main section:not(#intro) li",
        "main section:not(#intro) button",
        "main section:not(#intro) a",
        "main section:not(#intro) input",
        "main section:not(#intro) textarea",
        "main section:not(#intro) select",
      ].join(",");
      const horizontalClearance = carWidth / 2 + 18;
      const verticalClearance = carHeight / 2 + 72;
      const obstacles = Array.from(
        document.querySelectorAll<HTMLElement>(obstacleSelector),
      ).flatMap((element) => {
        const bounds = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        if (
          bounds.width < 2 ||
          bounds.height < 2 ||
          style.display === "none" ||
          style.visibility === "hidden" ||
          Number(style.opacity) === 0
        ) {
          return [];
        }

        return [
          {
            left: bounds.left - horizontalClearance,
            right: bounds.right + horizontalClearance,
            top: bounds.top + window.scrollY - verticalClearance,
            bottom: bounds.bottom + window.scrollY + verticalClearance,
          },
        ];
      });
      const firstY = Math.max(
        carHeight / 2 + 24,
        window.innerHeight - carHeight / 2 - 28,
      );
      const lastY = Math.min(
        height - 24,
        headingPoints[headingPoints.length - 1].y + 150,
      );
      const minimumX = carWidth / 2 + (mobile ? 5 : 18);
      const candidateXs: number[] = [];
      for (let x = minimumX; x <= edgeX; x += 18) candidateXs.push(x);
      candidateXs.push(edgeX);

      const findSafeX = (sampleY: number, desiredX: number, previousX: number) => {
        let selectedX = previousX;
        let selectedScore = Number.POSITIVE_INFINITY;

        for (const candidateX of candidateXs) {
          const collisions = obstacles.reduce(
            (count, obstacle) =>
              sampleY >= obstacle.top &&
              sampleY <= obstacle.bottom &&
              candidateX >= obstacle.left &&
              candidateX <= obstacle.right
                ? count + 1
                : count,
            0,
          );
          const score =
            collisions * 100000 +
            Math.abs(candidateX - desiredX) * 1.4 +
            Math.abs(candidateX - previousX) * 0.28;
          if (score < selectedScore) {
            selectedScore = score;
            selectedX = candidateX;
          }
        }

        return selectedX;
      };

      const findSafeXForRange = (
        rangeStart: number,
        rangeEnd: number,
        desiredX: number,
        previousX: number,
      ) => {
        let selectedX = previousX;
        let selectedScore = Number.POSITIVE_INFINITY;

        for (const candidateX of candidateXs) {
          const collisions = obstacles.reduce(
            (count, obstacle) =>
              rangeEnd >= obstacle.top &&
              rangeStart <= obstacle.bottom &&
              candidateX >= obstacle.left &&
              candidateX <= obstacle.right
                ? count + 1
                : count,
            0,
          );
          const score =
            collisions * 100000 +
            Math.abs(candidateX - desiredX) * 1.4 +
            Math.abs(candidateX - previousX) * 0.28;
          if (score < selectedScore) {
            selectedScore = score;
            selectedX = candidateX;
          }
        }

        return selectedX;
      };

      const points: Array<{ x: number; y: number }> = [
        { x: edgeX, y: firstY },
      ];
      let previousX = edgeX;
      headingPoints.forEach((headingPoint, index) => {
        const previousHeading = headingPoints[index - 1];
        const nextHeading = headingPoints[index + 1];
        const availableBefore = previousHeading
          ? headingPoint.y - previousHeading.y
          : headingPoint.y - firstY;
        const availableAfter = nextHeading
          ? nextHeading.y - headingPoint.y
          : lastY - headingPoint.y;
        const curveBefore = Math.max(90, Math.min(180, availableBefore * 0.18));
        const curveAfter = Math.max(90, Math.min(180, availableAfter * 0.18));
        const entryY = Math.max(points[points.length - 1].y + 12, headingPoint.y - curveBefore);
        const entryX = findSafeX(entryY, edgeX, previousX);
        points.push({ x: entryX, y: entryY });

        const exitY = Math.min(lastY, headingPoint.y + curveAfter);
        const titleX = findSafeXForRange(
          entryY,
          exitY,
          mobile ? edgeX : headingPoint.x,
          entryX,
        );
        points.push({ x: titleX, y: entryY });
        points.push({ x: titleX, y: exitY });

        const exitX = findSafeX(exitY, edgeX, titleX);
        points.push({ x: exitX, y: exitY });
        previousX = exitX;
      });
      if (points[points.length - 1].y < lastY) {
        points.push({ x: findSafeX(lastY, edgeX, previousX), y: lastY });
      }

      const compactPoints = points.filter(
        (point, index) =>
          index === 0 ||
          point.y > points[index - 1].y + 2 ||
          Math.abs(point.x - points[index - 1].x) > 4,
      );
      const distance = (
        first: { x: number; y: number },
        second: { x: number; y: number },
      ) => Math.hypot(second.x - first.x, second.y - first.y);
      const cornerRadius = mobile ? 38 : 96;
      let path = `M ${compactPoints[0].x.toFixed(1)} ${compactPoints[0].y.toFixed(1)}`;

      for (let index = 1; index < compactPoints.length - 1; index += 1) {
        const previous = compactPoints[index - 1];
        const current = compactPoints[index];
        const next = compactPoints[index + 1];
        const incomingDistance = distance(previous, current);
        const outgoingDistance = distance(current, next);
        if (incomingDistance < 1 || outgoingDistance < 1) continue;
        const radius = Math.min(
          cornerRadius,
          incomingDistance * 0.44,
          outgoingDistance * 0.44,
        );
        const incomingPoint = {
          x: current.x + ((previous.x - current.x) / incomingDistance) * radius,
          y: current.y + ((previous.y - current.y) / incomingDistance) * radius,
        };
        const outgoingPoint = {
          x: current.x + ((next.x - current.x) / outgoingDistance) * radius,
          y: current.y + ((next.y - current.y) / outgoingDistance) * radius,
        };
        path += ` L ${incomingPoint.x.toFixed(1)} ${incomingPoint.y.toFixed(1)} Q ${current.x.toFixed(1)} ${current.y.toFixed(1)} ${outgoingPoint.x.toFixed(1)} ${outgoingPoint.y.toFixed(1)}`;
      }
      const finalPoint = compactPoints[compactPoints.length - 1];
      path += ` L ${finalPoint.x.toFixed(1)} ${finalPoint.y.toFixed(1)}`;

      setRoute({ width, height, path, startY: firstY, endY: lastY });
    };

    const requestBuild = () => {
      if (!frameId) frameId = requestAnimationFrame(buildRoute);
    };

    buildRoute();
    const resizeObserver = new ResizeObserver(requestBuild);
    const mutationObserver = new MutationObserver(requestBuild);
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    if (main) {
      resizeObserver.observe(main);
      mutationObserver.observe(main, {
        attributes: true,
        subtree: true,
        attributeFilter: [
          "aria-expanded",
          "aria-hidden",
          "aria-pressed",
          "data-active",
          "data-slot",
          "data-visible",
        ],
      });
    }
    if (footer) resizeObserver.observe(footer);
    window.addEventListener("resize", requestBuild, { passive: true });
    document.fonts.ready.then(requestBuild);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", requestBuild);
    };
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      frameId = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;

      setProgress(nextProgress);

      const routePath = routePathRef.current;
      const vehicleStage = vehicleStageRef.current;
      if (!routePath || !vehicleStage) return;

      const routeLength = routePath.getTotalLength();
      const targetY =
        route.startY + (route.endY - route.startY) * nextProgress;
      let lowerLength = 0;
      let upperLength = routeLength;
      for (let index = 0; index < 14; index += 1) {
        const middleLength = (lowerLength + upperLength) / 2;
        const middlePoint = routePath.getPointAtLength(middleLength);
        if (middlePoint.y < targetY) lowerLength = middleLength;
        else upperLength = middleLength;
      }
      const travelLength = (lowerLength + upperLength) / 2;
      const point = routePath.getPointAtLength(travelLength);
      const previousPoint = routePath.getPointAtLength(
        Math.max(0, travelLength - 4),
      );
      const nextPoint = routePath.getPointAtLength(
        Math.min(routeLength, travelLength + 4),
      );
      const tangent =
        (Math.atan2(
          nextPoint.y - previousPoint.y,
          nextPoint.x - previousPoint.x,
        ) *
          180) /
          Math.PI -
        90;
      const turn = Math.max(-30, Math.min(30, tangent * 0.62));

      routeTurnRef.current = turn;
      vehicleStage.style.left = `${point.x}px`;
      vehicleStage.style.top = `${point.y}px`;
      vehicleStage.style.setProperty("--car-turn", `${turn}deg`);
    };

    const requestUpdate = () => {
      if (!frameId) frameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [route]);

  useEffect(() => {
    const isInteractiveTarget = (target: EventTarget | null) =>
      target instanceof Element &&
      Boolean(
        target.closest(
          "input, textarea, select, button, a, [contenteditable='true'], [role='tab']",
        ),
      );

    const setKey = (key: string, pressed: boolean) => {
      const normalized = key.toLowerCase();
      if (normalized === "w") {
        controlsRef.current.forward = pressed;
        return true;
      }
      if (normalized === "s") {
        controlsRef.current.backward = pressed;
        return true;
      }
      return false;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isInteractiveTarget(event.target)) return;
      if (setKey(event.key, true)) event.preventDefault();
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (setKey(event.key, false) && !isInteractiveTarget(event.target)) {
        event.preventDefault();
      }
    };

    const clearControls = () => {
      controlsRef.current = { ...EMPTY_CONTROLS };
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", clearControls);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", clearControls);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let animationId = 0;
    let resizeObserver: ResizeObserver | null = null;

    const initialize = async () => {
      const THREE = await import("three");
      if (cancelled) return;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(6, 4.35, 7.3);
      camera.lookAt(0, 1.05, 0);

      scene.add(new THREE.HemisphereLight(0xd9f5dd, 0x11130f, 2.4));

      const keyLight = new THREE.DirectionalLight(0xfff0d2, 4.4);
      keyLight.position.set(4, 8, 7);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      scene.add(keyLight);

      const rimLight = new THREE.PointLight(0xb58cff, 22, 15, 2);
      rimLight.position.set(-3, 4, -2);
      scene.add(rimLight);

      const orange = new THREE.MeshStandardMaterial({
        color: 0xf05222,
        roughness: 0.42,
        metalness: 0.35,
      });
      const orangeDark = new THREE.MeshStandardMaterial({
        color: 0x8f2615,
        roughness: 0.5,
        metalness: 0.42,
      });
      const graphite = new THREE.MeshStandardMaterial({
        color: 0x111513,
        roughness: 0.34,
        metalness: 0.72,
      });
      const glass = new THREE.MeshPhysicalMaterial({
        color: 0x162728,
        roughness: 0.08,
        metalness: 0.45,
        transmission: 0.18,
        transparent: true,
        opacity: 0.9,
      });
      const tireMaterial = new THREE.MeshStandardMaterial({
        color: 0x090b0a,
        roughness: 0.82,
        metalness: 0.08,
      });
      const hubMaterial = new THREE.MeshStandardMaterial({
        color: 0xf36a28,
        roughness: 0.32,
        metalness: 0.72,
      });
      const whiteLight = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffe8c4,
        emissiveIntensity: 8,
        toneMapped: false,
      });
      const violetLight = new THREE.MeshStandardMaterial({
        color: 0xb477ff,
        emissive: 0x6124d8,
        emissiveIntensity: 3.8,
        toneMapped: false,
      });

      const rover = new THREE.Group();
      rover.rotation.y = -0.18;
      scene.add(rover);

      const addBox = (
        size: [number, number, number],
        position: [number, number, number],
        material: import("three").Material,
        parent = rover,
      ) => {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
        mesh.position.set(...position);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        parent.add(mesh);
        return mesh;
      };

      addBox([2.65, 0.62, 4.25], [0, 0.92, 0], orangeDark);
      addBox([2.42, 0.72, 2.12], [0, 1.3, 1.02], orange);
      const hood = addBox([2.2, 0.18, 1.55], [0, 1.69, 1.25], orange);
      hood.rotation.x = -0.04;
      addBox([2.28, 1.28, 1.9], [0, 1.7, -0.72], orange);
      addBox([2.44, 0.18, 2.02], [0, 2.42, -0.7], graphite);
      addBox([1.25, 0.06, 1.25], [0, 1.83, 1.23], graphite);

      const windshield = addBox([1.88, 0.72, 0.07], [0, 1.95, 0.255], glass);
      windshield.rotation.x = -0.12;
      addBox([0.07, 0.7, 1.05], [1.155, 1.92, -0.77], glass);
      addBox([0.07, 0.7, 1.05], [-1.155, 1.92, -0.77], glass);
      addBox([2.05, 0.62, 0.08], [0, 1.92, -1.69], glass);

      addBox([0.18, 0.08, 1.35], [0.68, 1.82, 1.23], graphite);
      addBox([0.18, 0.08, 1.35], [-0.68, 1.82, 1.23], graphite);

      const headlightBar = addBox([2.16, 0.34, 0.12], [0, 1.28, 2.19], whiteLight);
      headlightBar.castShadow = false;
      addBox([0.4, 0.28, 0.14], [1.07, 1.25, 2.14], whiteLight);
      addBox([0.4, 0.28, 0.14], [-1.07, 1.25, 2.14], whiteLight);

      const roofBar = addBox([2.15, 0.22, 0.28], [0, 2.58, 0.03], graphite);
      roofBar.rotation.x = -0.03;
      for (let index = 0; index < 5; index += 1) {
        addBox(
          [0.28, 0.19, 0.09],
          [-0.68 + index * 0.34, 2.61, 0.19],
          whiteLight,
        );
      }

      const wheels: import("three").Mesh[] = [];
      const wheelGeometry = new THREE.CylinderGeometry(0.68, 0.68, 0.5, 24);
      const hubGeometry = new THREE.CylinderGeometry(0.31, 0.31, 0.52, 18);
      const wheelPositions: Array<[number, number, number]> = [
        [1.42, 0.72, 1.4],
        [-1.42, 0.72, 1.4],
        [1.42, 0.72, -1.42],
        [-1.42, 0.72, -1.42],
      ];

      for (const [x, y, z] of wheelPositions) {
        const wheel = new THREE.Mesh(wheelGeometry, tireMaterial);
        wheel.position.set(x, y, z);
        wheel.rotation.z = Math.PI / 2;
        wheel.castShadow = true;
        rover.add(wheel);
        wheels.push(wheel);

        const hub = new THREE.Mesh(hubGeometry, hubMaterial);
        hub.rotation.z = Math.PI / 2;
        hub.position.set(x, y, z);
        rover.add(hub);
        wheels.push(hub);
      }

      const antenna = new THREE.Group();
      antenna.position.set(0, 2.5, -1.14);
      rover.add(antenna);
      addBox([0.1, 0.72, 0.1], [0, 0.35, 0], violetLight, antenna);
      const beaconRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.34, 0.065, 12, 32),
        violetLight,
      );
      beaconRing.position.y = 0.82;
      beaconRing.rotation.x = Math.PI / 2;
      antenna.add(beaconRing);
      const beaconCore = new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 16, 16),
        violetLight,
      );
      beaconCore.position.y = 0.82;
      antenna.add(beaconCore);
      addBox([0.34, 0.13, 0.34], [0, 0.04, 0], graphite, antenna);

      const shadow = new THREE.Mesh(
        new THREE.CircleGeometry(2.15, 32),
        new THREE.MeshBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 0.24,
          depthWrite: false,
        }),
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.scale.set(0.75, 1.45, 1);
      shadow.position.y = 0.04;
      scene.add(shadow);

      const resize = () => {
        const bounds = canvas.getBoundingClientRect();
        const width = Math.max(1, bounds.width);
        const height = Math.max(1, bounds.height);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
      resize();

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const clock = new THREE.Clock();
      let lastScrollY = window.scrollY;
      let scrollVelocity = 0;
      let visualSpeed = 0;
      let elapsed = 0;

      const animate = () => {
        if (cancelled) return;
        animationId = requestAnimationFrame(animate);
        const delta = Math.min(clock.getDelta(), 0.05);
        elapsed += delta;
        const controls = controlsRef.current;
        const driveDirection =
          controls.forward ? 1 : controls.backward ? -1 : 0;
        if (driveDirection !== 0) {
          document.documentElement.scrollTop += driveDirection * delta * 520;
        }

        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;
        const scrollable = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight,
        );
        const journeyProgress = THREE.MathUtils.clamp(
          currentScrollY / scrollable,
          0,
          1,
        );
        const routeLane = Math.sin(journeyProgress * Math.PI * 5) * 0.72;
        const steeringTurn = THREE.MathUtils.clamp(
          routeTurnRef.current / 30,
          -1,
          1,
        );
        scrollVelocity = THREE.MathUtils.lerp(
          scrollVelocity,
          scrollDelta / Math.max(delta, 0.001),
          0.12,
        );
        visualSpeed = THREE.MathUtils.lerp(
          visualSpeed,
          Math.min(12, Math.abs(scrollVelocity) * 0.012 + Math.abs(driveDirection) * 5),
          0.1,
        );

        rover.position.x = THREE.MathUtils.lerp(
          rover.position.x,
          routeLane,
          0.055,
        );
        rover.rotation.y = THREE.MathUtils.lerp(
          rover.rotation.y,
          -0.18 - steeringTurn * 0.42,
          0.1,
        );
        rover.rotation.z = THREE.MathUtils.lerp(
          rover.rotation.z,
          -steeringTurn * 0.055,
          0.1,
        );
        rover.position.y = reducedMotion
          ? 0
          : Math.sin(elapsed * 3.4) * 0.025 * Math.min(1, visualSpeed);

        const wheelStep = scrollDelta * 0.012 + driveDirection * delta * 5.4;
        wheels.forEach((wheel) => {
          wheel.rotation.x += wheelStep;
        });

        antenna.rotation.y = reducedMotion ? 0 : Math.sin(elapsed * 1.8) * 0.08;
        renderer.render(scene, camera);
      };

      setReady(true);
      animate();

      return () => {
        cancelAnimationFrame(animationId);
        resizeObserver?.disconnect();
        scene.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        });
        renderer.dispose();
        renderer.forceContextLoss();
      };
    };

    let cleanup: (() => void) | undefined;
    initialize()
      .then((dispose) => {
        if (cancelled) dispose?.();
        else cleanup = dispose;
      })
      .catch(() => {
        setReady(false);
        setFailed(true);
      });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      className={styles.journeyLayer}
      data-ready={ready ? "true" : "false"}
      data-failed={failed ? "true" : "false"}
      aria-hidden="true"
      style={
        {
          "--path-offset": 1 - progress,
          "--journey-height": `${route.height}px`,
        } as CSSProperties
      }
    >
      <svg
        className={styles.worldPath}
        viewBox={`0 0 ${route.width} ${route.height}`}
        preserveAspectRatio="none"
      >
        <path
          ref={routePathRef}
          className={styles.pathBase}
          d={route.path}
          pathLength="1"
        />
        <path
          className={styles.pathProgress}
          d={route.path}
          pathLength="1"
        />
      </svg>

      <div ref={vehicleStageRef} className={styles.vehicleStage}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
