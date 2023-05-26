# Adopt A Dog Fetch FE Take Home Challenge
## Info
A deployed version can be found at:

https://adopt-a-dog-brown.vercel.app

## Instructions to run on your local machine
### Step 1: Clone the repo
Navigate to your desired directory in your terminal.
In your terminal type:

`git clone https://github.com/masonroyal/adopt-a-dog`

### Step 2: Open and install dependencies
Open the code in your code editor by typing:

`code adopt-a-dog`

Once your code editor is open, in your code terminal type:

`npm install`

or if you use yarn:

`yarn install`


### Step 3: (Optional) Enable a working map for geo bound searching 
NOTE: React leafet and Next.js's SSR do not play well together due to leaflet regularly needing to call the `window` object. As such, in the build version, the map is unable to be changed without reloading.

In the SearchLocation component comment out SearchMapWithNoSSR component and uncomment out SearchMap like this: 
![image](https://github.com/masonroyal/adopt-a-dog/assets/90655588/5903bd08-58d1-48c1-a8f6-7a30f1675c86)

This will allow for map functionality in dev mode, but Next will not be able to build a production version.

### Step 4: Run
In your terminal type:

`npm run dev`
