import * as L from 'leaflet';

export function shipHistoryTrack(rawTrack) {
  const plist = rawTrack.intervalPoints.map((v) => new L.LatLng(v.lat, v.lon));
  return L.polyline(plist, {
    color: 'red',
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1
  });
}

export function createTimeline(track: any) {
  const trackDates = track.intervalPoints.map((v) => [roundTimestamp(v.msgt), new L.LatLng(v.lat, v.lon), v.sog]);
  const dates = new Set();
  const filtered = trackDates.filter(trac => {
    if (dates.has(trac[0])) {
      return false;
    }
    dates.add(trac[0]);
    return true;
  });
  return filtered;
}

function roundDate(date, minutes = 30) {
  const coeff = 1000 * 60 * minutes;
  return new Date(Math.round(Date.parse(date) / coeff) * coeff);
}

function roundTimestamp(date, minutes = 5) {
  const coeff = 1000 * 60 * minutes;
  return Math.round(Date.parse(date) / coeff) * coeff;
}


