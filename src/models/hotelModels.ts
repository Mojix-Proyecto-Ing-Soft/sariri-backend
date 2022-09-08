export type Hotel = {
    location_id: string,
    hotel_name: string,
    hotel_lat: string,
    hotel_lng: string,
    photo_url_large: string,
    photo_url_original: string,
    hotel_price: string,
    hotel_rating: number,
    hotel_address: string,
    num_reviews: number,
    hotel_ranking: string,
    contact_number: string,
    price_level: string,
    awards: number[] | Award[],
    services: number[] | Service[]
};

export type Award = {
    award_id: string,
    display_name: string,
    badge_url: string
};

export type Service = {
    service_id: string,
    icon_name: string,
    service_name: string
};