import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import CharacterCard from "../components/CharacterCard";
import { Plus, Radiation, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Dashboard() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      const data = await base44.entities.Character.list("-updated_date", 50);
      setCharacters(data);
    } catch {
      toast.error("Failed to load characters.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Radiation className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
          <p className="font-mono text-sm text-muted-foreground">Loading vault records...</p>
        </div>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-muted border border-border flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
            No Characters Yet
          </h2>
          <p className="text-sm text-muted-foreground font-mono mb-6">
            Create your first character to begin exploring the wasteland.
          </p>
          <Link to="/builder">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold gap-2">
              <Plus className="w-4 h-4" />
              Create Character
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-foreground">
            Your Characters
          </h2>
          <p className="text-xs font-mono text-muted-foreground mt-1">
            {characters.length} vault record{characters.length !== 1 ? "s" : ""} on file
          </p>
        </div>
        <Link to="/builder">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold gap-2 text-sm">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Character</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>
    </div>
  );
}