"use client";
import { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html, ContactShadows, Grid } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, SSAO } from "@react-three/postprocessing";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { TEAM, TEAM_ARRAY, type Agent } from "@/lib/constants";
import { MeetingRoom, Reception, OpsRoom, PhoneBooth, BrandLogoWall, CreativeStudio, PrivateCabin, SocialHub, OfficeChair } from "./OfficeRooms";
import AgentChat from "@/components/AgentChat";

const WORK_STATIONS = TEAM_ARRAY.map((agent, i) => {
  const angle = (i / TEAM_ARRAY.length) * Math.PI * 2;
  const radius = 13.5; 
  return {
    agent: agent.id,
    pos: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [number,number,number],
    rot: [0, -angle + Math.PI / 2, 0] as [number,number,number],
  };
});

const ROOM_POIS = {
  RECEPTION: new THREE.Vector3(0, 0, -32),
  MEETING_CHAIRS: [
    new THREE.Vector3(32, 0, -1.5),
    new THREE.Vector3(33.5, 0, 0),
    new THREE.Vector3(32, 0, 1.5),
    new THREE.Vector3(30.5, 0, 0),
  ],
  OPS_RADAR: new THREE.Vector3(0, 0, 32),
  CENTER: new THREE.Vector3(0, 0, 0),
  CREATIVE: new THREE.Vector3(-32, 0, 0),
};

/**
 * ── HOLOGRAPHIC AVATAR ──
 */
function HologramAvatar({ agent, position, isCollaborating, idx, onClick, meetPoint }: { 
  agent: Agent; 
  position: [number,number,number]; 
  isCollaborating: boolean; 
  idx: number;
  onClick: () => void;
  meetPoint: THREE.Vector3 | null;
}) {
  const root = useRef<THREE.Group>(null);
  const glow = useRef<THREE.Mesh>(null);
  const cur = useRef(new THREE.Vector3(...position));
  const tgt = useRef(new THREE.Vector3(...position));
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (meetPoint) {
      tgt.current.copy(meetPoint);
      return;
    }
    const move = () => {
       const r = Math.random();
       if (r > 0.8) tgt.current.copy(ROOM_POIS.RECEPTION);
       else if (r > 0.6) tgt.current.copy(ROOM_POIS.MEETING_CHAIRS[idx % 4]);
       else if (r > 0.4) tgt.current.copy(ROOM_POIS.CREATIVE);
       else tgt.current.set(position[0], position[1], position[2]);
    };
    const iv = setInterval(move, 12000 + idx * 1000);
    return () => clearInterval(iv);
  }, [position, idx, meetPoint]);

  useFrame((s) => {
    if (!root.current) return;
    const t = s.clock.elapsedTime + idx;
    
    // Movement
    if (cur.current.distanceTo(tgt.current) > 0.1) {
      const dir = tgt.current.clone().sub(cur.current).normalize();
      cur.current.addScaledVector(dir, 0.06);
      root.current.position.copy(cur.current);
      root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, Math.atan2(dir.x, dir.z), 0.1);
    } else {
      root.current.position.y = Math.sin(t * 2) * 0.05 + 0.1; // Levitation
    }

    if (glow.current) {
        (glow.current.material as THREE.MeshBasicMaterial).opacity = 0.2 + Math.sin(t * 4) * 0.1;
    }
  });

  return (
    <group 
      ref={root} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      <Text position={[0, 1.8, 0]} fontSize={0.18} color={agent.colorCode} font="/fonts/Inter-Bold.ttf">
        {agent.name.toUpperCase()}
      </Text>
      
      {/* Sleek Silhouette */}
      <mesh castShadow>
        <capsuleGeometry args={[0.2, 1.2, 4, 8]}/>
        <meshStandardMaterial 
          color={agent.colorCode} 
          emissive={agent.colorCode} 
          emissiveIntensity={0.5} 
          transparent 
          opacity={0.6}
        />
      </mesh>
      
      {/* Outer Pulse Glow */}
      <mesh ref={glow}>
        <capsuleGeometry args={[0.25, 1.25, 4, 8]}/>
        <meshBasicMaterial color={agent.colorCode} transparent opacity={0.1} />
      </mesh>

      {isCollaborating && (
        <Html position={[0, 2.1, 0]} center>
          <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden border border-white/5">
            <motion.div 
               className="h-full bg-white shadow-[0_0_10px_#fff]"
               animate={{ width: ["0%", "100%"] }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </Html>
      )}
    </group>
  );
}

/**
 * ── STEALTH WORK DESK ──
 */
function WorkDesk({ agent, position, rotation, activeTask }: { 
  agent: Agent; 
  position: [number,number,number]; 
  rotation: [number,number,number];
  activeTask?: any;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Matte Black Desk */}
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.04, 1.2]}/>
        <meshStandardMaterial color="#020205" roughness={0.1} metalness={0.8}/>
      </mesh>
      
      {/* Futuristic Floating Monitors */}
      {[-0.6, 0.6].map(x => (
        <group key={x} position={[x, 1.05, -0.3]} rotation={[0, x < 0 ? 0.3 : -0.3, 0]}>
          <mesh><boxGeometry args={[1.0, 0.6, 0.02]}/><meshStandardMaterial color="#000"/></mesh>
          <mesh position={[0, 0, 0.015]}>
            <planeGeometry args={[0.96, 0.56]}/>
            <meshBasicMaterial color={agent.colorCode} transparent opacity={0.1} toneMapped={false}/>
          </mesh>
          <Html position={[0, 0, 0.02]} transform center scale={0.05} distanceFactor={6}>
             <div className="flex flex-col items-center p-2 text-white/50 font-mono select-none">
                <span className="text-[4px] font-bold tracking-widest">{agent.name}</span>
                <span className="text-[6px] text-white mt-1">{activeTask ? "SYSTEMING..." : "IDLE"}</span>
             </div>
          </Html>
        </group>
      ))}

      {/* Under-desk Emissive Strip */}
      <mesh position={[0, 0.72, 0]}>
        <boxGeometry args={[2.42, 0.02, 1.22]}/>
        <meshBasicMaterial color={agent.colorCode} transparent opacity={0.3}/>
      </mesh>
    </group>
  );
}

/**
 * ── MAIN OFFICE SCENE v6 ──
 */
export default function Office3D() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [logoTexture, setLogoTexture] = useState<THREE.Texture | null>(null);
  
  const bgColor = "#020205";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tReq = await fetch("/api/tasks");
        if (tReq.ok) {
           const data = await tReq.json();
           setTasks(Array.isArray(data) ? data : (data.tasks || []));
        }
        const bReq = await fetch("/api/brands");
        if (bReq.ok) {
           const bData = await bReq.json();
           const activeBrand = bData.find((b: any) => b.id === 'gk');
           if (activeBrand?.logo) {
             new THREE.TextureLoader().load(activeBrand.logo, (tex) => setLogoTexture(tex));
           }
        }
      } catch (err) {}
    };
    fetchData();
    const iv = setInterval(fetchData, 8000);
    return () => clearInterval(iv);
  }, []);

  const meetingTask = useMemo(() => tasks.find(t => t.status === 'review'), [tasks]);
  const meetingAgentId = meetingTask?.agent;

  return (
    <div className="absolute inset-0 w-full h-full bg-[#020205] pointer-events-auto">
      <Canvas shadows camera={{ position: [22, 18, 22], fov: 40 }}>
        <color attach="background" args={[bgColor]} />
        <OrbitControls maxPolarAngle={Math.PI / 2.1} minDistance={10} maxDistance={80} enableDamping />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 15, 0]} intensity={100} color="#7c3aed" distance={50} decay={2} />
        <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} intensity={500} castShadow />
        
        {/* Stealth Floor */}
        <Grid 
          infiniteGrid 
          cellSize={1} 
          sectionSize={5} 
          fadeDistance={50} 
          cellColor="#1e1b4b" 
          sectionColor="#312e81" 
          cellThickness={0.5}
          sectionThickness={1.5}
        />
        <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#020205" roughness={0.1} metalness={1} />
        </mesh>

        <Suspense fallback={null}>
          <MeetingRoom position={[32, 0, 0]}/>
          <Reception position={[0, 0, -32]}/>
          <OpsRoom position={[0, 0, 32]}/>
          <CreativeStudio position={[-32, 0, 0]}/>
          <PrivateCabin position={[24, 0, 18]} brandTexture={logoTexture}/>
          <PrivateCabin position={[-24, 0, -18]} brandTexture={logoTexture}/>
          <BrandLogoWall position={[0, 6, -31.5]} brandTexture={logoTexture}/>

          {WORK_STATIONS.map((cfg, i) => {
            const agent = TEAM[cfg.agent];
            if (!agent) return null;
            const activeTask = tasks.find(t => t.agent === agent.id && t.status === 'in-progress');
            const isInMeeting = meetingAgentId === agent.id;
            const meetPoint = isInMeeting ? new THREE.Vector3(32, 0, 0) : null;

            return (
              <group key={agent.id}>
                <WorkDesk agent={agent} position={cfg.pos} rotation={cfg.rot} activeTask={activeTask}/>
                <OfficeChair position={[cfg.pos[0] * 1.04, cfg.pos[1], cfg.pos[2] * 1.04]} rotation={cfg.rot} color={agent.colorCode} />
                <HologramAvatar 
                  agent={agent} 
                  position={[cfg.pos[0] * 1.08, cfg.pos[1], cfg.pos[2] * 1.08]} 
                  isCollaborating={!!activeTask} 
                  idx={i}
                  onClick={() => setSelectedAgent(agent)}
                  meetPoint={meetPoint}
                />
              </group>
            );
          })}

          <ContactShadows position={[0, 0, 0]} opacity={0.6} scale={100} blur={2} far={10} color="#000" />
        </Suspense>

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.2} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>

      <AnimatePresence>
        {selectedAgent && (
          <div className="absolute bottom-6 right-6 z-50 pointer-events-auto">
            <AgentChat agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
