import { motion } from 'framer-motion';

const leaderboardData = [
  { rank: 1, name: "KariKalan_99", score: 98450, kingdom: "Chola", medal: "🥇" },
  { rank: 2, name: "PandyaKing", score: 95200, kingdom: "Pandya", medal: "🥈" },
  { rank: 3, name: "CheraArrow", score: 91100, kingdom: "Chera", medal: "🥉" },
  { rank: 4, name: "Veera_Blade", score: 88400, kingdom: "Chola", medal: "" },
  { rank: 5, name: "ShadowSlayer", score: 86500, kingdom: "Pandya", medal: "" },
  { rank: 6, name: "AgathiyanDisciple", score: 84200, kingdom: "Chera", medal: "" },
  { rank: 7, name: "TigerFlag", score: 82100, kingdom: "Chola", medal: "" },
  { rank: 8, name: "FishEmblem", score: 80900, kingdom: "Pandya", medal: "" },
  { rank: 9, name: "BowArrow_Master", score: 79500, kingdom: "Chera", medal: "" },
  { rank: 10, name: "TamilWarrior", score: 78000, kingdom: "Chola", medal: "" },
];

export default function Leaderboard() {
  return (
    <div className="min-h-screen pt-32 pb-24 noise-bg">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-4xl md:text-6xl text-primary text-glow-gold mb-4 uppercase tracking-widest">
            Hall of Legends
          </h1>
          <p className="text-muted-foreground">The greatest warriors across Tamilakam.</p>
        </motion.div>

        <motion.div 
          className="bg-card border border-primary/30 overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background border-b border-border/50 text-muted-foreground text-xs uppercase tracking-widest">
                  <th className="py-4 px-6 font-normal w-24">Rank</th>
                  <th className="py-4 px-6 font-normal">Warrior</th>
                  <th className="py-4 px-6 font-normal">Kingdom</th>
                  <th className="py-4 px-6 font-normal text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((row, idx) => {
                  const isTop3 = idx < 3;
                  return (
                    <motion.tr 
                      key={row.name}
                      className={`border-b border-border/20 transition-colors ${isTop3 ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-muted/50'}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (idx * 0.05) }}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className={`font-serif text-xl ${isTop3 ? 'text-primary' : 'text-muted-foreground'}`}>{row.rank}</span>
                          <span className="text-xl">{row.medal}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-serif text-lg text-foreground tracking-wide">
                        {row.name}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-xs uppercase tracking-widest px-2 py-1 border ${
                          row.kingdom === 'Chola' ? 'border-blue-500 text-blue-400' :
                          row.kingdom === 'Pandya' ? 'border-emerald-500 text-emerald-400' :
                          'border-red-500 text-red-400'
                        }`}>
                          {row.kingdom}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-mono text-primary font-bold">
                        {row.score.toLocaleString()}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
