"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Html, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * ── PROFESSIONAL MISSION CONTROL COMPONENTS ──
 */

// Glass Panel - Premium Variant
function GlassPanel({ position, rotation, size }: {
  position: [number,number,number];
  rotation?: [number,number,number];
  size: [number,number,number];
}) {
  return (
    <mesh position={position} rotation={rotation ?? [0,0,0]} castShadow>
      <boxGeometry args={size}/>
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.2}
        chromaticAberration={0.025}
        anisotropy={0.1}
        distortion={0.1}
        distortionScale={0.1}
        temporalDistortion={0.01}
        color="#7c3aed"
        attenuationDistance={0.5}
        attenuationColor="#ffffff"
      />
    </mesh>
  );
}

// Glass Door
function GlassDoor({ position, rotation }: {
  position: [number,number,number];
  rotation?: [number,number,number];
}) {
  return (
    <group position={position} rotation={rotation ?? [0,0,0]}>
      <mesh><boxGeometry args={[1.05, 2.6, 0.06]}/><meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1}/></mesh>
      <mesh position={[0,0,0.04]}>
        <boxGeometry args={[0.92, 2.45, 0.02]}/>
        <MeshTransmissionMaterial backside samples={4} thickness={0.1} chromaticAberration={0.05} color="#8b5cf6" />
      </mesh>
      <mesh position={[0.38, 0, 0.07]} castShadow><boxGeometry args={[0.05, 0.4, 0.04]}/><meshStandardMaterial color="#7c3aed" metalness={1} roughness={0}/></mesh>
    </group>
  );
}

// Executive Chair
export function OfficeChair({ position, rotation, color }: {
  position: [number,number,number];
  rotation?: [number,number,number];
  color?: string;
}) {
  const c = color ?? "#1e293b";
  return (
    <group position={position} rotation={rotation ?? [0,0,0]}>
      {/* Seat */}
      <mesh position={[0,0.46,0]} castShadow>
        <boxGeometry args={[0.55,0.08,0.52]}/>
        <meshStandardMaterial color={c} roughness={1} metalness={0}/>
      </mesh>
      {/* Backrest */}
      <mesh position={[0,0.85,-0.22]} castShadow>
        <boxGeometry args={[0.55,0.7,0.08]}/>
        <meshStandardMaterial color={c} roughness={1} metalness={0}/>
      </mesh>
      {/* Base */}
      <mesh position={[0,0.12,0]}>
        <cylinderGeometry args={[0.03,0.03,0.24,8]}/>
        <meshStandardMaterial color="#475569" metalness={1} roughness={0.2}/>
      </mesh>
    </group>
  );
}

// Large Command Display
function CommandDisplay({ position, rotation, title, value, detail }: {
  position: [number,number,number];
  rotation?: [number,number,number];
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <group position={position} rotation={rotation ?? [0,0,0]}>
      <mesh castShadow><boxGeometry args={[4.2, 2.4, 0.1]}/><meshStandardMaterial color="#020205" metalness={1} roughness={0.1}/></mesh>
      <mesh position={[0,0,0.06]}>
        <planeGeometry args={[4.0, 2.2]}/>
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.05} toneMapped={false}/>
      </mesh>
      <Html position={[0, 0, 0.07]} center transform scale={0.25} distanceFactor={10}>
        <div style={{ width: 800, background: "rgba(5, 5, 10, 0.9)", borderRadius: 8, padding: 40, color: "#fff", fontFamily: "'Inter', sans-serif", border: "1px solid rgba(124, 58, 237, 0.3)", boxShadow: "0 0 40px rgba(124, 58, 237, 0.15)" }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: "#7c3aed", letterSpacing: "0.2em", marginBottom: 20 }}>{title}</div>
          <div style={{ fontSize: 48, fontWeight: 900, marginBottom: 10 }}>{value}</div>
          <p style={{ color: "#94a3b8", fontSize: 16 }}>{detail}</p>
        </div>
      </Html>
      <pointLight position={[0,0,1]} intensity={5} color="#7c3aed" distance={10} />
    </group>
  );
}

// ── MEETING ROOM ──
export function MeetingRoom({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      {/* Floor Cutout */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.005,0]} receiveShadow>
        <planeGeometry args={[8.5, 7]}/>
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.1}/>
      </mesh>
      {/* Main Table */}
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.0, 2.0, 0.1, 4]}/>
        <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.37, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 0.74, 4]}/>
        <meshStandardMaterial color="#475569" metalness={1} roughness={0}/>
      </mesh>
      
      <GlassPanel position={[0, 3, -3.5]} size={[8.5, 6, 0.05]}/>
      <GlassPanel position={[-4.25, 3, 0]} size={[0.05, 6, 7]}/>
      <GlassPanel position={[4.25, 3, 0]} size={[0.05, 6, 7]}/>
      <GlassPanel position={[-2.5, 3, 3.5]} size={[3.5, 6, 0.05]}/>
      <GlassPanel position={[2.5, 3, 3.5]} size={[3.5, 6, 0.05]}/>
      <GlassDoor position={[0, 1.3, 3.5]}/>

      <CommandDisplay 
        position={[4.1, 3, 0]} 
        rotation={[0, -Math.PI/2, 0]} 
        title="ECOSYSTEM GROWTH" 
        value="₹50,00,000" 
        detail="Projected quarterly revenue across all 12 AI business channels."
      />

      {[0, 1, 2, 3].map(i => (
        <OfficeChair key={i} 
          position={[Math.cos((i/4)*Math.PI*2)*1.8, 0, Math.sin((i/4)*Math.PI*2)*1.8]} 
          rotation={[0, (i/4)*Math.PI*2 + Math.PI, 0]} 
          color="#1e293b"
        />
      ))}
    </group>
  );
}

// ── RECEPTION ──
export function Reception({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 2.0, 1.2]}/>
        <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.5}/>
      </mesh>
      <mesh position={[0, 2.05, 0]}>
        <boxGeometry args={[4.6, 0.1, 1.3]}/>
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.5}/>
      </mesh>
      <Text position={[0, 4.0, 0]} fontSize={0.3} color="#fff" anchorX="center" maxWidth={10}>
        GKOS MISSION CONTROL
      </Text>
    </group>
  );
}

// ── OPS ROOM ──
export function OpsRoom({ position }: { position: [number,number,number] }) {
  const scrollRef = useRef<THREE.Group>(null);
  useFrame(s => { if (scrollRef.current) scrollRef.current.position.y = (s.clock.elapsedTime * 0.5) % 2; });

  return (
    <group position={position}>
      <mesh position={[0, 3, -3.2]}><boxGeometry args={[8, 6.5, 0.2]}/><meshStandardMaterial color="#020205"/></mesh>
      <group position={[0, 3, -3.05]}>
        <mesh><planeGeometry args={[7, 5]}/><meshBasicMaterial color="#000" transparent opacity={0.9}/></mesh>
        <group ref={scrollRef}>
          {Array.from({length: 15}).map((_, i) => (
            <Text key={i} position={[0, 2 - i*0.35, 0.01]} fontSize={0.1} color="#7c3aed" anchorX="center">
              {`AGENT_LOG: [NAV] EXECUTING SECTOR_${(Math.random()*9000).toFixed(0)} - STATUS: NOMINAL`}
            </Text>
          ))}
        </group>
      </group>
      <GlassPanel position={[0, 3, 3.2]} size={[8, 6.5, 0.05]} />
      <GlassPanel position={[-4, 3, 0]} size={[0.05, 6.5, 6.4]} />
      <GlassPanel position={[4, 3, 0]} size={[0.05, 6.5, 6.4]} />
    </group>
  );
}

// ── PHONE BOOTHS (Sleek Pods) ──
export function PhoneBooth({ position, color }: {
  position: [number,number,number];
  color: string;
}) {
  return (
    <group position={position}>
      <mesh position={[0, 1.85, 0]} castShadow>
        <cylinderGeometry args={[0.9, 0.9, 3.7, 32, 1, true]}/>
        <meshStandardMaterial color={color} transparent opacity={0.1} roughness={0} metalness={0.5} side={THREE.DoubleSide}/>
      </mesh>
      <mesh position={[0, 0.05, 0]}><cylinderGeometry args={[0.9, 0.9, 0.1, 32]}/><meshStandardMaterial color="#0f172a"/></mesh>
      <mesh position={[0, 3.65, 0]}><cylinderGeometry args={[0.9, 0.96, 0.1, 32]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5}/></mesh>
      <Text position={[0, 3.9, 0]} fontSize={0.15} color={color} anchorX="center">FOCUS POD</Text>
    </group>
  );
}

// ── CREATIVE STUDIO ──
export function CreativeStudio({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 3, -4]}><boxGeometry args={[10, 6, 0.2]}/><meshStandardMaterial color="#020205"/></mesh>
      <mesh position={[0, 3, -3.85]}>
        <planeGeometry args={[9, 5]}/>
        <meshStandardMaterial color="#111" emissive="#7c3aed" emissiveIntensity={0.05}/>
      </mesh>
      <Text position={[0, 5.5, -3.5]} fontSize={0.3} color="#7c3aed" anchorX="center">CREATIVE SUITE</Text>
    </group>
  );
}

// ── SOCIAL HUB ──
export function SocialHub({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.01,0]} receiveShadow><planeGeometry args={[12, 10]}/><meshStandardMaterial color="#050510" roughness={0.5}/></mesh>
      <group position={[0, 0.8, 0]}>
         <mesh castShadow><boxGeometry args={[2.5, 0.15, 1.25]}/><meshStandardMaterial color="#0f172a" metalness={0.5}/></mesh>
         <Text position={[0, 1.5, 0]} fontSize={0.2} color="#fff" anchorX="center">COLLAB LOUNGE</Text>
      </group>
    </group>
  );
}

// ── PRIVATE CABIN ──
export function PrivateCabin({ position, brandTexture }: { 
  position: [number,number,number];
  brandTexture?: THREE.Texture | null;
}) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.01,0]} receiveShadow><planeGeometry args={[7, 7]}/><meshStandardMaterial color="#0a0a20" roughness={0.1}/></mesh>
      <GlassPanel position={[0, 3, -3.5]} size={[7, 6, 0.05]}/>
      <GlassPanel position={[0, 3, 3.5]} size={[7, 6, 0.05]}/><GlassDoor position={[2, 1.3, 3.5]}/>
      <CommandDisplay position={[0, 3.5, -3.4]} title="COMMANDER'S HUD" value="GK" detail="Operational control for Graphikardia Master OS." />
    </group>
  );
}

// ── BRAND LOGO WALL ──
export function BrandLogoWall({ position, rotation, brandTexture }: {
  position: [number,number,number];
  rotation?: [number,number,number];
  brandTexture?: THREE.Texture | null;
}) {
  return (
    <group position={position} rotation={rotation ?? [0,0,0]}>
      <mesh position={[0, 0, -0.1]}><boxGeometry args={[12, 6.5, 0.2]}/><meshStandardMaterial color="#000" metalness={0.8} roughness={0.1}/></mesh>
      <mesh position={[0,0,0]}>
        <planeGeometry args={[11.5, 6]}/>
        <meshBasicMaterial 
          color="#fff" 
          map={brandTexture || undefined} 
          transparent opacity={brandTexture ? 0.95 : 0.05} 
          toneMapped={false} 
        />
      </mesh>
      {!brandTexture && (
        <Text position={[0, 0, 0.1]} fontSize={0.6} color="#7c3aed" anchorX="center" letterSpacing={0.2}>
          GRAPHIKARDIA HQ
        </Text>
      )}
    </group>
  );
}
