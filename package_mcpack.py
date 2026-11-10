from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

PACK_ROOT = Path(__file__).parent / "bedrock-real-day"
OUTPUT_FILE = Path(__file__).parent / "Real-Time-24-Hour-Day.mcpack"


def main():
    if not (PACK_ROOT / "manifest.json").is_file():
        raise FileNotFoundError(f"Missing pack manifest: {PACK_ROOT / 'manifest.json'}")

    files = [path for path in sorted(PACK_ROOT.rglob("*")) if path.is_file()]
    with ZipFile(OUTPUT_FILE, "w", ZIP_DEFLATED) as archive:
        for path in files:
            archive.write(path, path.relative_to(PACK_ROOT).as_posix())

    print(f"Created {OUTPUT_FILE} with {len(files)} files")


if __name__ == "__main__":
    main()
