import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const MemberShipPage = () => {
    return (
        <div>
            <Grid container data-aos="fade-in" sx={{ backgroundColor: '#DF5A49 ', justifyContent: 'center', textAlign: 'center' }} p={4} id="member-images">
                <Grid item xs={12} sm={6}>
                    <Typography className="member_1"
                        sx={{ color: "#626262", marginTop: "40px;", fontSize: "3em;", lineHeight: "1.25;", fonFamily: "'jaf-bernina-sans';" }}>Become a Member Today!</Typography>
                    <Typography sx={{ marginBottom: "20px;", color: "#626262;", marginTop: "20px;", fontSize: "18px" }}>
                        Join the leading green building community in the arab world.</Typography>
                </Grid>
            </Grid>
            <Grid container sx={{ backgroundColor: '#DF5A49 ', justifyContent: 'center' }} p={4}>
                <Grid item xs={12} data-aos="fade-in">
                    <h1 className=" text-white text-center"
                        style={{ fontWeight: "bold;", marginBottom: "30px;", marginTop: "40px;", fontSize: "3em;", lineHeight: " 1.25;", fontFamily: 'jaf-bernina-sans' }}>All members get access to:</h1>
                </Grid>
                <Grid item xs={12} sm={10} data-aos="fade-in">
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} p={1} justifyContent={"flex-start"} alignItems={'center'} display={"flex"} flexDirection={"row"}>
                            <img src="/frontend/assets/img/Computer-white.png" height="120" width="120" />
                            <p className="text-white ml_class" style={{ width: "85%;", fontSize: "18px;", padding: '50px' }}>
                                Visibility in the community through your digital SGBF profile.</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} p={1} justifyContent={"flex-start"} alignItems={'center'} display={"flex"} flexDirection={"row"}>
                            <img src="/frontend/assets/img/Discussion-white.png" height="120" width="120" />
                            <p className="text-white ml_class" style={{ width: "85%;", fontSize: "18px;", padding: '50px' }}>
                                Engagement and participation in digital group discussions . .</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} p={1} justifyContent={"flex-start"} alignItems={'center'} display={"flex"} flexDirection={"row"}>
                            <img src="/frontend/assets/img/Attendees-white.png" height="120" width="120" />
                            <p className="text-white ml_class" style={{ width: "85%;", fontSize: "18px;", padding: '50px' }}>
                                Access to networking opportunities with other liked minded individuals.</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} p={1} justifyContent={"flex-start"} alignItems={'center'} display={"flex"} flexDirection={"row"}>
                            <img src="/frontend/assets/img/Project-white.png" height="120" width="120" />
                            <p className="text-white ml_class" style={{ width: "85%;", fontSize: "18px;", padding: '50px' }}>
                                Access to the Green project catalogue .</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container sx={{ justifyContent: 'center' }} spacing={4} p={4} data-aos="fade-in">
                <Grid item xs={12} sm={5}>
                    <Typography className="offset-3" sx={{ fontWeight: "bold;", marginBottom: "20px;", fontSize: "3em;", lineHeight: "1.25;", fontFamily: 'jaf-bernina-sans' }}>Individual</Typography>
                    <Typography sx={{ fontSize: "18px;", fontWeight: 700, width: "84%;", color: "#626262;", fontFamily: 'droid-serif', letterSpacing: "0.012em" }}>Members of the working individual features in addition to all the personnel free Perspective Member of the Saudi Green Buildings Forum</Typography>
                    <ul >
                        <li className='membership-list'>ID Card excellence for membership in the SGBF</li>
                        <li className='membership-list'>Inclusions in the list of members and who communicate about everything new</li>
                        <li className='membership-list'>Unlimited access to the SGBF website (profile member on the official website) to take advantage of the special services.</li>
                        <li className='membership-list'>Discounts on conferences and continuing education and registration of projects and educational programs for green buildings and shops.</li>
                        <li className='membership-list'>Leadership and business opportunities for green buildings in the Kingdom, the GCC, and the United States.</li>
                        <li className='membership-list'>Newsfeed access in the Saudi Green Building Forum.</li>
                    </ul>
                    <Link className="btn btn-get-started membership-btn"
                    >Become an Individual Member.</Link>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Typography className="offset-3" sx={{ fontWeight: "bold;", marginBottom: "20px;", fontSize: "3em;", lineHeight: "1.25;", fontFamily: 'jaf-bernina-sans' }}>Establishment</Typography>
                    <Typography sx={{ fontSize: "18px;", fontWeight: 700, width: "84%;", color: "#626262;", fontFamily: 'droid-serif', letterSpacing: "0.012em" }}>Directory a list of institutions and companies specialized in the field of green building.</Typography>
                    <ul >
                        <li className='membership-list'>Invitation to attend all councils developing activities and access new opportunities in green building projects..</li>
                        <li className='membership-list'>Certification of membership and the use of the brand by "Saudi Green Buildings Forum".</li>
                        <li className='membership-list'>Discounts on educational programs and documentaries..</li>
                        <li className='membership-list'>Free use of program for friendly products for humans and the environment..</li>
                        <li className='membership-list'>Free access to saaf® application in the Kingdom, GCC and the US.</li>
                        <li className='membership-list'>Directory listing in the journal Saudi Green Building Forum</li>
                        <li className='membership-list'>Leadership and business opportunities for green buildings in the Kingdom, the GCC, and the United States.</li>
                    </ul>
                    <Link className="btn btn-get-started membership-btn"
                    >Become an Establishment Member</Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default MemberShipPage