const { useState } = require('react')

const useGetAllSponsors = () => {
  const [sponsors, setSponsors] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
}