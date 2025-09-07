"use client";
import { StickyNote } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const ShaderBackground = () => {
  const meshRef = useRef<any>();

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      for(int i = 0; i < 6; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Create flowing patterns
      float time = uTime * 0.3;
      vec2 flow = vec2(
        fbm(uv * 3.0 + time),
        fbm(uv * 3.0 + time + 100.0)
      );
      
      // Multiple noise layers for complexity
      float noise1 = fbm(uv * 4.0 + flow * 0.5 + time);
      float noise2 = fbm(uv * 8.0 - flow * 0.3 + time * 0.7);
      float noise3 = fbm(uv * 16.0 + flow * 0.2 - time * 0.5);
      
      // Combine noise layers
      float combined = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
      
      // Color palette: blue, dark blue, gray, black
      vec3 color1 = vec3(0.1, 0.2, 0.4); // Dark blue
      vec3 color2 = vec3(0.2, 0.4, 0.8); // Blue  
      vec3 color3 = vec3(0.3, 0.3, 0.3); // Gray
      vec3 color4 = vec3(0.05, 0.05, 0.05); // Near black
      
      // Mix colors based on noise
      vec3 finalColor = mix(color1, color2, smoothstep(0.2, 0.6, combined));
      finalColor = mix(finalColor, color3, smoothstep(0.6, 0.8, combined));
      finalColor = mix(finalColor, color4, smoothstep(0.8, 1.0, combined));
      
      // Add subtle pulsing
      float pulse = sin(time * 2.0) * 0.1 + 0.9;
      finalColor *= pulse;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
        }}
      />
    </mesh>
  );
};

const NotSignedIn = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden rounded-4">
      <div className="absolute inset-0 w-full h-full">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ShaderBackground />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col rounded-xl border border-white/20 items-center gap-4 p-6 w-auto bg-white/10 backdrop-blur-sm max-w-fit">
        <div className="bg-blue-600 rounded-lg p-5">
          <StickyNote className="text-white" />
        </div>
        <h2 className="p-3 text-white text-2xl font-semibold">
          Sign In or Register to Add Notes
        </h2>
        <span className="p-3 text-gray-200">
          You need to have an account to create and manage your notes.
        </span>
        <SignInButton>
          <button className="border border-blue-400 shadow-lg pl-4 pr-4 pt-3 pb-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg text-white font-medium">
            Create Note
          </button>
        </SignInButton>
      </div>
    </div>
  );
};

export default NotSignedIn;
