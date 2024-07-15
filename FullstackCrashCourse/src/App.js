import { useEffect, useState } from "react";

import supabase from "./supabase";

import "./style.css";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function App() {
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    async function loadFacts() {
      const { data: loadedFacts, error } = await supabase
        .from("Facts")
        .select("*")
        .order("votesInteresting", { ascending: false })
        .limit(100);

      if (!error && loadedFacts != null) {
        setFacts(loadedFacts);
      } else {
        alert("error retrieving data from supabase");
      }

      setIsLoading(false);
    }
    loadFacts();
  }, []);

  return (
    <>
      <Header
        formIsVisible={formIsVisible}
        setFormIsVisible={setFormIsVisible}
      />
      {formIsVisible ? (
        <NewFactForm setFacts={setFacts} setFormIsVisible={setFormIsVisible} />
      ) : null}

      <main className="main">
        <CategoryFilters setCategory={setCurrentCategory} />
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <FactsList
            facts={facts}
            category={currentCategory}
            setFacts={setFacts}
          />
        )}
      </main>
    </>
  );
}

function LoadingComponent() {
  return <p className="loading-message">LOADING...</p>;
}

function Header({ formIsVisible, setFormIsVisible }) {
  const titleName = "Today I learned";

  return (
    <header className="header">
      <div className="logoBox">
        <img src="logo.png" alt="hello logo" />
        <h1>{titleName}</h1>
      </div>
      <button
        id="btn-share-fact"
        className="btn btn-large"
        onClick={() => {
          setFormIsVisible(!formIsVisible);
        }}
      >
        {formIsVisible ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

// Utility function
function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setFormIsVisible }) {
  const [factText, setFactText] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [categoryText, setCategoryText] = useState("");
  const [isUploadingFact, setIsUploadingFact] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (factText && isValidHttpUrl(sourceText) && categoryText) {
      setIsUploadingFact(true);
      const { data: newFact, error } = await supabase
        .from("Facts")
        .insert([
          { text: factText, source: sourceText, category: categoryText },
        ])
        .select();
      setIsUploadingFact(false);

      if (!error && newFact !== null) {
        setFacts((facts) => [newFact[0], ...facts]);
      } else {
        alert("error uploading fact to database");
      }

      setFactText("");
      setSourceText("");
      setCategoryText("");

      setFormIsVisible(false);
    }
  }

  const maxFactLength = 20;

  return (
    <form className="factForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a knowledge with the world"
        onChange={(e) => {
          const newText = e.target.value;
          if (newText.length <= maxFactLength) {
            setFactText(newText);
          }
        }}
        value={factText}
      />
      <span>{maxFactLength - factText.length}</span>
      <input
        type="text"
        placeholder="Trustworth source"
        onChange={(e) => setSourceText(e.target.value)}
        value={sourceText}
      />
      <select
        onChange={(e) => setCategoryText(e.target.value)}
        value={categoryText}
      >
        <option key="" value="">
          Choose a category...
        </option>
        {CATEGORIES.map((cat) => {
          return (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          );
        })}
      </select>
      <button className="btn btn-large" disabled={isUploadingFact}>
        Post
      </button>
    </form>
  );
}

function CategoryFilters({ setCategory }) {
  return (
    <aside>
      <ul>
        <li key="all" className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => {
              setCategory("all");
            }}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((category) => {
          return (
            <CategoryFilter categoryProp={category} setCategory={setCategory} />
          );
        })}
      </ul>
    </aside>
  );
}

function CategoryFilter(props) {
  const categoryProp = props.categoryProp;
  const setCategory = props.setCategory;

  return (
    <li key={categoryProp.name} className="category">
      <button
        className="btn btn-category"
        style={{ backgroundColor: categoryProp.color }}
        onClick={() => {
          setCategory(categoryProp.name);
        }}
      >
        {categoryProp.name}
      </button>
    </li>
  );
}

function FactsList({ facts, category, setFacts }) {
  const filteredFacts = facts.filter((fact) => {
    return category === "all" || fact.category === category;
  });

  return (
    <section>
      <ul id="facts-list">
        {filteredFacts.map((fact) => {
          return <Fact factProp={fact} setFacts={setFacts} />;
        })}
      </ul>
      <p>There are {filteredFacts.length} facts!</p>
    </section>
  );
}

function Fact(props) {
  /* The props in here can be obtained like:
  
  const { factProp } = props; 
  
  Also, we could do this decoupling directly in the parameter:

  function Fact({ factProp })

  But I kept the parameter as props just for simplicity.
  */
  const [isLoading, setIsLoading] = useState(false);

  const fact = props.factProp;
  const setFacts = props.setFacts;

  const getCorrespondingColor = (categoryName) => {
    const foundCategory = CATEGORIES.find((category) => {
      return category.name == categoryName;
    });
    return foundCategory.color;
  };

  async function handleVote(votesProperty) {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("Facts")
      .update({ [votesProperty]: fact[votesProperty] + 1 })
      .eq("id", fact.id)
      .select();
    setIsLoading(false);

    if (!error) {
      const updatedFact = data[0];
      setFacts((facts) => {
        return facts.map((f) => {
          return f.id === updatedFact.id ? updatedFact : f;
        });
      });
    }
  }

  return (
    <li key={fact.id} className="fact">
      <p>
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: getCorrespondingColor(fact.category),
        }}
      >
        {fact.category}
      </span>
      <div className="voteButtons">
        <button
          onClick={() => {
            handleVote("votesInteresting");
          }}
          disabled={isLoading}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => {
            handleVote("votesMindblowing");
          }}
          disabled={isLoading}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button
          onClick={() => {
            handleVote("votesFalse");
          }}
          disabled={isLoading}
        >
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default App;
