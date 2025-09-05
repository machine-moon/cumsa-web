export const MapContainer = ({ children }: any) => (
  <div data-testid="map-container">{children}</div>
);
export const TileLayer = () => <div data-testid="tile-layer" />;
export const Marker = ({ position, children }: any) => (
  <div data-testid="marker" data-position={JSON.stringify(position)}>
    {children}
  </div>
);
export const Popup = ({ children }: any) => <div data-testid="popup">{children}</div>;
