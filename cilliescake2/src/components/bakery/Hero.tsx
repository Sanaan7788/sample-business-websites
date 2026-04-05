import { useEffect, useRef } from "react";
import { Star, ChevronDown } from "lucide-react";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    try {
      const THREE = (window as any).THREE;
      if (!THREE || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
      camera.position.z = 30;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Particles
      const count = 200;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
        const c = new THREE.Color().setHSL(0.44, 0.2, 0.7 + Math.random() * 0.3);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader: `
          attribute vec3 aColor;
          varying vec3 vColor;
          void main(){
            vColor = aColor;
            vec4 mv = modelViewMatrix * vec4(position,1.0);
            gl_PointSize = 3.0 * (20.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main(){
            float d = length(gl_PointCoord - 0.5);
            if(d > 0.5) discard;
            float a = 1.0 - smoothstep(0.3,0.5,d);
            gl_FragColor = vec4(vColor, a * 0.6);
          }
        `,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);

      // Wireframe floaters
      const wireframeMat = new THREE.MeshBasicMaterial({ color: 0xB8963E, wireframe: true, transparent: true, opacity: 0.15 });
      const floaters = [
        new THREE.Mesh(new THREE.OctahedronGeometry(2), wireframeMat),
        new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.4, 8, 16), wireframeMat),
        new THREE.Mesh(new THREE.IcosahedronGeometry(1.8), wireframeMat),
      ];
      floaters[0].position.set(-15, 8, -5);
      floaters[1].position.set(12, -6, -8);
      floaters[2].position.set(18, 10, -3);
      floaters.forEach((f) => scene.add(f));

      let mouseX = 0, mouseY = 0;
      const onMouse = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouse);

      let frame = 0;
      const animate = () => {
        frame = requestAnimationFrame(animate);
        const t = Date.now() * 0.001;
        points.rotation.y = t * 0.05;
        points.rotation.x = t * 0.02;
        floaters.forEach((f, i) => {
          f.rotation.x = t * (0.2 + i * 0.1);
          f.rotation.y = t * (0.15 + i * 0.08);
          f.position.y += Math.sin(t + i) * 0.003;
        });
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      };
      window.addEventListener("resize", onResize);

      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
      };
    } catch (e) {
      console.warn("Three.js initialization failed:", e);
    }
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=1800&q=85&fit=crop)`,
        }}
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(10,20,16,.60), rgba(10,20,16,.80))",
        }}
      />
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#FFFFFF",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          Crafted with <em className="text-gold italic">Love,</em> Designed to{" "}
          <em className="text-gold italic">Delight.</em>
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.85)" }}>
          Houston's premier custom cake atelier — where every celebration gets a centerpiece as unique
          and beautiful as the moment itself.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground text-base font-medium hover:bg-primary/90 transition-all hover:scale-105"
          >
            Get a Free Quote
          </a>
          <a
            href="#gallery"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border-2 border-gold text-gold text-base font-medium hover:bg-gold/10 transition-all hover:scale-105"
          >
            View Our Work
          </a>
        </div>
      </div>

      {/* Floating stat badges */}
      <div className="absolute left-4 sm:left-8 bottom-24 sm:bottom-32 z-10 animate-float">
        <div className="bg-background/90 backdrop-blur rounded-xl px-4 py-3 shadow-lg flex items-center gap-2">
          <div className="flex text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground">5.0 Rating</span>
        </div>
      </div>
      <div className="absolute right-4 sm:right-8 bottom-24 sm:bottom-32 z-10 animate-float-delay">
        <div className="bg-background/90 backdrop-blur rounded-xl px-4 py-3 shadow-lg text-center">
          <span className="text-xl font-bold text-primary">500+</span>
          <span className="text-xs block text-text-body">Cakes Crafted</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-scroll-bounce">
        <a href="#about" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
          <ChevronDown size={28} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
