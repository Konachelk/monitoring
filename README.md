# Monitoring app 
Open app by executing this command in downloaded folder: cd frontend && npm install && ng serve -o (backend/docker is in progress)


## About the app
Monitoring app displays positions of Norwegian ships in selected area. Positions are updated every 30 seconds.

## Default view

<!-- ![Default view](https://i.ibb.co/KyHJ76x/default-view.png) -->
<img src="https://i.ibb.co/KyHJ76x/default-view.png" alt="Your image title" width="800"/>

## Get area
Enter the coordinates of the space where you want to see the position of the ships. After entering the data and pressing the "Get area" button, a rectangle will be displayed on the map in orange, representing the area from which the ships' data are shown  
<img src="https://i.ibb.co/BjG7gRn/get-area-new-parameters.png" alt="Your image title" width="800"/>
<img src="https://i.ibb.co/yXG7wTR/new-area-rectanges.png" alt="Your image title" width="800"/>

## Ship list
List of mmsi of all visible ships. Click one of them to select the ship. You can also click on the marker on the map.
<img src="https://i.ibb.co/jhG3fkZ/Ship-list.png" alt="Your image title" width="800"/>

## Ship details
Once the ship is selected, its picture and details will be shown.
<img src="https://i.ibb.co/f4fP3dN/ship-details.png" alt="Your image title" width="800"/>

## Timeline
Once the ship is selected, press the "Get timeline" button to see on the map the route taken by the vessel in the last 24 hours. Move the marker to see where the ship has been at any given time. In addition, you will see a graph of the sog (Speed over ground) over time.
<img src="https://i.ibb.co/pJRYjd6/show-timeline-off.png" alt="Your image title" width="800"/>
<img src="https://i.ibb.co/wYHfK7J/timeline-whole-view.png" alt="Your image title" width="800"/>
<img src="https://i.ibb.co/jHjYb0H/timeline-play.png" alt="Your image title" width="800"/>
