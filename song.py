import os
import time

lyrics = [
    "naa maatuna badhaku matala cure-u vaa ?",
    "kannu kanna kalalaku oxygen store-u vaa ?",
    "naa jatha kaagalava ?"
    " 🫵ــــــــــــــﮩ٨ـ❤️️✨🌷͙֒🦋⃝💍. . . . . . . . . . . . . . . . . . . . . . . . . . . ."
]

# --- adjust these timings (seconds) to match your video ---
# time between start of each line
line_timings = [0, 5.5, 11.2] # example: line 1 at 0s, line 2 at 5.5s, line 3 at 11.2s

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def display_lyrics(lyrics, timings):
    clear_screen()
    print("earllilee-\n")
    start_time = time.time()
    for i, line in enumerate(lyrics):
        # wait until the correct time for each line
        while time.time() - start_time < timings[i]:
            time.sleep(0.05)
        # display line slowly
        for char in line:
            print(char, end='', flush=True)
            time.sleep(0.09)
        print()
        time.sleep(0.5)

if __name__ == "__main__":
    display_lyrics(lyrics, line_timings)